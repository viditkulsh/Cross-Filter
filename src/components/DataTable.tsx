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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">Clear filters to view all data</span>
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
          {/* Enhanced Table Header Info */}
          <div className="flex items-center justify-between mb-6">
              <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <svg className="w-4 h-4 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Data Results
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {filteredData.length.toLocaleString()} records total
                      {sortConfig && (
                          <span className="ml-3 text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
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
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Clear sort
                      </button>
                  )}
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg font-medium">
                      Page {currentPage} of {totalPages}
                  </span>
              </div>
          </div>

          {/* Professional Data Table */}
          <div className="bi-table">
        <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bi-table-header">
                          <tr>
                              {columns.map((col) => (
                  <th 
                    key={col} 
                        className="px-8 py-5 text-left cursor-pointer hover:bg-gray-800 transition-all duration-200 group"
                        onClick={() => handleSort(col)}
                  >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                        {/* Enhanced Column Icons */}
                                        <div className="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                                            {col.startsWith('mod') ? (
                                                <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                                </svg>
                                            ) : (
                                                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                            )}
                                        </div>

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
                                <svg
                                    className={`w-4 h-4 transition-all duration-200 ${sortConfig?.key === col && sortConfig.direction === 'asc'
                                            ? 'text-yellow-400 scale-125'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <svg
                                    className={`w-4 h-4 -mt-1 transition-all duration-200 ${sortConfig?.key === col && sortConfig.direction === 'desc'
                                            ? 'text-yellow-400 scale-125'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                    </div>
                  </th>
                ))}
              </tr>
                      </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                      className="bi-table-row animate-fade-in"
                  style={{ animationDelay: `${rowIndex * 0.02}s` }}
                >
                      {columns.map(col => {
                          const value = row[col];
                          const numValue = Number(value);

                          return (
                              <td key={col} className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                                {/* Enhanced Primary value display */}
                                <span className={`font-semibold ${col === 'value'
                                        ? 'text-xl text-gray-900 font-bold'
                                        : 'text-lg text-gray-700'
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
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Mod {col.replace('mod', '')} = {value}
                                    </span>
                                )}

                                {/* Enhanced Primary value indicator */}
                                {col === 'value' && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-bold flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Primary Data
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
