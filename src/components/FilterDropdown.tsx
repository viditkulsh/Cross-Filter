import { useDataContext } from '../context/DataContext';
import { useMemo, useState } from 'react';

interface FilterDropdownProps {
  column: string;
  options: string[];
}

export const FilterDropdown = ({ column }: FilterDropdownProps) => {
  const { filters, setFilters, filteredData, originalData } = useDataContext();
  const [isOpen, setIsOpen] = useState(false);

  // Compute available options based on filtered dataset for cross-filtering
  const availableOptions = useMemo(() => {
    const unique = new Set<string>();
    filteredData.forEach(row => {
      const value = row[column]?.toString();
      if (value !== undefined && value !== '') {
        unique.add(value);
      }
    });
    return Array.from(unique).sort((a, b) => Number(a) - Number(b));
  }, [filteredData, column]);

  const allOptions = useMemo(() => {
    const unique = new Set<string>();
    originalData.forEach(row => {
      const value = row[column]?.toString();
      if (value !== undefined && value !== '') {
        unique.add(value);
      }
    });
    return Array.from(unique).sort((a, b) => Number(a) - Number(b));
  }, [originalData, column]);

  const selectedValues = filters[column] || [];
  const hasSelection = selectedValues.length > 0;

  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    setFilters({ ...filters, [column]: newSelected });
  };

  const clearAll = () => {
    setFilters({ ...filters, [column]: [] });
  };

  const selectAll = () => {
    setFilters({ ...filters, [column]: availableOptions });
  };

  return (
    <div className="relative">
          {/* Modern Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
              className={`w-full p-3 text-left flex items-center justify-between rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
          hasSelection
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
      >
              <div className="flex-1 min-w-0">
          {hasSelection ? (
            <div>
                          <div className="font-medium text-sm">
                {selectedValues.length} value{selectedValues.length !== 1 ? 's' : ''} selected
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                              {selectedValues.slice(0, 2).map(value => (
                                  <span key={value} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {value}
                  </span>
                ))}
                              {selectedValues.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                      +{selectedValues.length - 2}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
                              <div className="text-sm text-gray-500">All values</div>
                              <div className="text-xs text-gray-400">{allOptions.length} options</div>
            </div>
          )}
        </div>
        
              <div className="ml-3 flex items-center space-x-2">
          {hasSelection && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
                          className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
              title="Clear selection"
            >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
                  <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${hasSelection ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              </div>
      </button>

          {/* Modern Dropdown Menu */}
      {isOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-in">
                  {/* Header */}
                  <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                      <div className="flex justify-between items-center mb-2">
                          <div className="text-sm font-medium text-gray-900">Filter Options</div>
                          <div className="flex space-x-2">
                <button
                  onClick={selectAll}
                  disabled={availableOptions.length === 0}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                                  All
                </button>
                <button
                  onClick={clearAll}
                  disabled={selectedValues.length === 0}
                                  className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                                  None
                </button>
              </div>
            </div>
                      <div className="text-xs text-gray-500">
                          {availableOptions.length} of {allOptions.length} available
                      </div>
          </div>

                  {/* Options List */}
                  <div className="max-h-48 overflow-y-auto">
            {allOptions.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                              <div className="text-2xl mb-1">📊</div>
                              <div className="text-sm">No options available</div>
              </div>
            ) : (
                              <div className="py-1">
                {allOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  const isAvailable = availableOptions.includes(option);
                    const modValue = Number(option);
                  
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      disabled={!isAvailable}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                        !isAvailable 
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-gray-50 cursor-pointer'
                      } ${
                        isSelected 
                          ? 'bg-blue-50' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                              {/* Checkbox */}
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected 
                                  ? 'bg-blue-600 border-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                              {/* Value */}
                        <span className={`font-medium ${
                          isSelected 
                                  ? 'text-blue-900' 
                            : isAvailable 
                                      ? 'text-gray-900' 
                              : 'text-gray-400'
                        }`}>
                          {option}
                        </span>

                              {/* Color indicator for modulo values */}
                              <span className={`status-indicator ${modValue === 0 ? 'mod-0' :
                                      modValue === 1 ? 'mod-1' :
                                          modValue === 2 ? 'mod-2' :
                                              modValue === 3 ? 'mod-3' :
                                                  modValue === 4 ? 'mod-4' :
                                                      'mod-5'
                                  }`}>
                                  {option}
                              </span>
                      </div>
                      
                          {/* Status indicators */}
                          <div className="flex items-center space-x-1">
                        {!isAvailable && (
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                      filtered out
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

          {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
