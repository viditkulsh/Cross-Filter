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
          {/* Amazon-Style Enhanced Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
              className={`w-full p-4 text-left flex items-center justify-between rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group ${
          hasSelection
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-900 shadow-md'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:shadow-lg'
            }`}
      >
              <div className="flex-1 min-w-0">
          {hasSelection ? (
            <div>
                          <div className="font-bold text-sm flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                {selectedValues.length} value{selectedValues.length !== 1 ? 's' : ''} selected
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                              {selectedValues.slice(0, 3).map(value => (
                                  <span key={value} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    {value}
                  </span>
                ))}
                              {selectedValues.length > 3 && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300">
                                      +{selectedValues.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>
                              <div className="text-sm text-gray-600 font-medium flex items-center">
                                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                  Select values to filter
                              </div>
                              <div className="text-xs text-gray-400 mt-1">{allOptions.length} options available</div>
            </div>
          )}
        </div>
        
              <div className="ml-4 flex items-center space-x-3">
          {hasSelection && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-500 transition-all duration-200 hover:scale-110"
              title="Clear selection"
            >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
                  <div className={`p-2 rounded-lg transition-all duration-200 ${hasSelection ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'}`}>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${hasSelection ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                  </div>
              </div>
      </button>

          {/* Amazon-Style Enhanced Dropdown Menu */}
      {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 animate-fade-in backdrop-blur-sm">
                  {/* Enhanced Header */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
                      <div className="flex justify-between items-center mb-3">
                          <div className="text-sm font-bold text-gray-900 flex items-center">
                              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                              </svg>
                              Filter Options
                          </div>
                          <div className="flex space-x-3">
                <button
                  onClick={selectAll}
                  disabled={availableOptions.length === 0}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-200"
                >
                                  <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Select All
                </button>
                <button
                  onClick={clearAll}
                  disabled={selectedValues.length === 0}
                                  className="text-xs text-red-600 hover:text-red-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 bg-red-50 rounded-full border border-red-200 hover:bg-red-100 transition-all duration-200"
                >
                                  <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Clear
                </button>
              </div>
            </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                          <span className="flex items-center">
                              <svg className="w-3 h-3 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {availableOptions.length} of {allOptions.length} available
                          </span>
                          {selectedValues.length > 0 && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                  {selectedValues.length} selected
                              </span>
                          )}
                      </div>
          </div>

                  {/* Enhanced Options List */}
                  <div className="max-h-64 overflow-y-auto">
            {allOptions.length === 0 ? (
                          <div className="p-6 text-center text-gray-500">
                              <div className="text-4xl mb-3">�</div>
                              <div className="text-sm font-medium text-gray-700 mb-1">No Data Available</div>
                              <div className="text-xs text-gray-500">Check your data source</div>
              </div>
            ) : (
                              <div className="py-2">
                {allOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option);
                  const isAvailable = availableOptions.includes(option);
                    const modValue = Number(option);
                  
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      disabled={!isAvailable}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-200 ${
                        !isAvailable 
                          ? 'opacity-40 cursor-not-allowed bg-gray-50'
                          : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer'
                      } ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500' 
                          : ''
                      }`}
                                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center space-x-4">
                              {/* Enhanced Checkbox */}
                              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected 
                                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 shadow-md' 
                            : 'border-gray-300 hover:border-blue-400'
                        }`}>
                          {isSelected && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                              {/* Enhanced Value Display */}
                        <div className="flex items-center space-x-3">
                                  <span className={`font-bold text-lg ${
                              isSelected 
                                      ? 'text-blue-900' 
                                : isAvailable 
                                          ? 'text-gray-900' 
                                  : 'text-gray-400'
                            }`}>
                              {option}
                            </span>

                                  {/* Enhanced Color indicator for modulo values */}
                                  <span className={`status-indicator ${modValue === 0 ? 'mod-0' :
                                          modValue === 1 ? 'mod-1' :
                                              modValue === 2 ? 'mod-2' :
                                                  modValue === 3 ? 'mod-3' :
                                                      modValue === 4 ? 'mod-4' :
                                                          'mod-5'
                                      }`}>
                                      Mod {option}
                                  </span>
                        </div>
                      </div>
                      
                          {/* Enhanced Status indicators */}
                          <div className="flex items-center space-x-2">
                              {isSelected && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      Selected
                          </span>
                              )}
                        {!isAvailable && (
                                  <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full font-medium border border-red-200">
                                      <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                      </svg>
                                      Filtered out
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
