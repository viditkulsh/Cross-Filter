import { useDataContext } from '../context/DataContext';
import { useMemo, useState } from 'react';

export const DataTable = () => {
  const { filteredData } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const rowsPerPage = 20;

  // Get all columns from the first row
  const columns = useMemo(() => {
    if (filteredData.length === 0) return [];
    return Object.keys(filteredData[0]);
  }, [filteredData]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = Number(a[sortConfig.key]) || 0;
            const bVal = Number(b[sortConfig.key]) || 0;

            if (sortConfig.direction === 'asc') {
                return aVal - bVal;
            }
            return bVal - aVal;
        });
    }, [filteredData, sortConfig]);

    // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
      return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handleSort = (key: string) => {
        setSortConfig(current => {
            if (current?.key === key) {
                return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
  };

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6 animate-pulse">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Data Available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                No records match your current filter criteria. Try adjusting or clearing your filters to see data.
            </p>
            <div className="inline-flex items-center space-x-3 text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-xl border border-blue-200 shadow-sm">
                ℹ️ <span className="text-sm font-semibold">Clear filters to view all data</span>
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
          {/* Enhanced Table Header Info */}
          <div className="flex items-center justify-between mb-6">
              <div>
                  <h3 className="text-xl font-bold text-gray-900">
                      Data Results
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                      {filteredData.length.toLocaleString()} records total
                      {sortConfig && (
                          <span className="ml-3 text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                              Sorted by {sortConfig.key} ({sortConfig.direction === 'asc' ? '↑' : '↓'})
                          </span>
                      )}
                  </p>
              </div>

              <div className="flex items-center space-x-4">
                  {sortConfig && (
                      <button
                          onClick={() => setSortConfig(null)}
                          className="bi-button-secondary text-sm"
                      >
                          Clear sort
                      </button>
                  )}
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg font-medium">
                      Page {currentPage} of {totalPages}
                  </span>
              </div>
          </div>

          {/* Enhanced Data Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-gray-100 border-b border-gray-200">
                          <tr>
                              {columns.map((col) => (
                  <th 
                    key={col} 
                                      className="px-6 py-4 text-left cursor-pointer hover:bg-gray-200 transition-colors duration-150 group"
                        onClick={() => handleSort(col)}
                  >
                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                        {/* Enhanced Column Icons */}
                                      <div>
                                    <span className="font-bold text-sm">
                                        {col === 'value' ? 'Primary Value' : col.replace('mod', 'Modulo ')}
                                    </span>

                                    {/* Enhanced Column type indicators */}
                                    {col.startsWith('mod') && (
                                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full uppercase font-bold ml-2">
                                            Filter Column
                                        </span>
                                    )}
                                    {col === 'value' && (
                                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold ml-2">
                                            Data Column
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced Sort indicator */}
                            <div className="flex flex-col ml-3">
                                <span className={`text-xs transition-all duration-200 ${sortConfig?.key === col && sortConfig.direction === 'asc'
                                            ? 'text-yellow-400 scale-125'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                    ▲
                                </span>
                                <span className={`text-xs -mt-1 transition-all duration-200 ${sortConfig?.key === col && sortConfig.direction === 'desc'
                                            ? 'text-yellow-400 scale-125'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                    ▼
                                </span>
                            </div>
                    </div>
                  </th>
                ))}
              </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                      className={`transition-colors duration-150 hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                >
                      {columns.map(col => {
                          const value = row[col];
                          const numValue = Number(value);

                          return (
                              <td key={col} className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                      {/* Value display */}
                                      <span className={`font-medium ${col === 'value'
                                          ? 'text-lg text-gray-900 font-semibold'
                                          : 'text-sm text-gray-700'
                                    }`}>
                                    {value}
                                </span>

                                {/* Enhanced Modulo value indicators */}
                                {col.startsWith('mod') && (
                                    <span className={`status-indicator ${numValue === 0 ? 'mod-0' :
                                            numValue === 1 ? 'mod-1' :
                                                numValue === 2 ? 'mod-2' :
                                                    numValue === 3 ? 'mod-3' :
                                                        numValue === 4 ? 'mod-4' :
                                                            'mod-5'
                                        }`}>
                                        ✓ Mod {col.replace('mod', '')} = {value}
                                    </span>
                                )}

                                {/* Enhanced Primary value indicator */}
                                {col === 'value' && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-bold flex items-center">
                                            ⚡ Primary Data
                                        </span>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </td>
                      );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

          {/* Modern Pagination */}
      {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-6 py-4">
          <div className="text-sm text-gray-600">
                      Showing <span className="font-semibold">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
                      <span className="font-semibold">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of{' '}
                      <span className="font-semibold">{filteredData.length}</span> results
          </div>

                  <div className="flex items-center space-x-2">
            <button
                          onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
                          className="bi-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          First
                      </button>
                      <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="bi-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

                      <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              const page = i + Math.max(1, currentPage - 2);
                              if (page > totalPages) return null;

                              return (
                                  <button
                                      key={page}
                                      onClick={() => setCurrentPage(page)}
                                      className={`px-3 py-2 text-sm font-medium rounded ${page === currentPage
                                              ? 'bg-blue-600 text-white'
                                              : 'text-gray-700 hover:bg-gray-100'
                                          }`}
                                  >
                                      {page}
                                  </button>
                              );
                          })}
                      </div>

            <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
                          className="bi-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
                      <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="bi-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Last
                      </button>
          </div>
        </div>
      )}
    </div>
  );
};
