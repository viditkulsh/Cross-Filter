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
      {/* Enhanced Dropdown Button with Visual Hierarchy */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 text-left flex items-center justify-between rounded-xl transition-all duration-300 border-2 focus:outline-none shadow-sm ${
          hasSelection
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 text-blue-800 shadow-md'
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
        } ${isOpen ? 'ring-4 ring-blue-100 border-blue-400' : ''}`}
      >
        <div className="flex-1">
          {hasSelection ? (
            <div>
              <span className="font-semibold text-sm">
                {selectedValues.length} value{selectedValues.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedValues.slice(0, 3).map(value => (
                  <span key={value} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                    {value}
                  </span>
                ))}
                {selectedValues.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    +{selectedValues.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <span className="text-gray-500 font-medium">Select values...</span>
              <div className="text-xs text-gray-400 mt-1">
                {allOptions.length} options available
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Dropdown Icon */}
        <div className="ml-4 flex items-center space-x-2">
          {hasSelection && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
              title="Clear selection"
            >
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className={`w-5 h-5 ${hasSelection ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Enhanced Dropdown Menu with Better Spacing */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          {/* Enhanced Header with Better Alignment */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Filter Options
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {availableOptions.length} of {allOptions.length} available
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={selectAll}
                  disabled={availableOptions.length === 0}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  disabled={selectedValues.length === 0}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            </div>
            
            {/* Selection Summary */}
            {hasSelection && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="text-xs text-blue-700 font-medium">
                  {selectedValues.length} selected: {selectedValues.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Options List with Better Visual Hierarchy */}
          <div className="max-h-64 overflow-y-auto">
            {allOptions.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-medium">No options available</div>
                <div className="text-sm">Check if data loaded correctly</div>
              </div>
            ) : (
              <div className="py-2">
                {allOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  const isAvailable = availableOptions.includes(option);
                  
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      disabled={!isAvailable}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-200 ${
                        !isAvailable 
                          ? 'opacity-40 cursor-not-allowed bg-gray-50' 
                          : 'cursor-pointer hover:bg-gray-50'
                      } ${
                        isSelected 
                          ? 'bg-blue-50 border-r-4 border-blue-500' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Selection Indicator */}
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200 ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Option Value */}
                        <span className={`font-medium ${
                          isSelected 
                            ? 'text-blue-700' 
                            : isAvailable 
                              ? 'text-gray-800' 
                              : 'text-gray-400'
                        }`}>
                          {option}
                        </span>
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="flex items-center space-x-2">
                        {!isAvailable && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full font-medium">
                            Filtered out
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                            Selected
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

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
