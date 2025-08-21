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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
                No records match your current filter criteria. Try adjusting or clearing your filters to see data.
            </p>
            <div className="inline-flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Clear filters to view all data</span>
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
          {/* Table Header Info */}
          <div className="flex items-center justify-between">
              <div>
                  <h3 className="text-lg font-semibold text-gray-900">Data Results</h3>
                  <p className="text-sm text-gray-600">
                      {filteredData.length.toLocaleString()} records total
                      {sortConfig && (
                          <span className="ml-2 text-blue-600">
                              • Sorted by {sortConfig.key} ({sortConfig.direction === 'asc' ? 'ascending' : 'descending'})
                          </span>
                      )}
                  </p>
              </div>

              <div className="flex items-center space-x-3">
                  {sortConfig && (
                      <button
                          onClick={() => setSortConfig(null)}
                          className="bi-button-secondary text-sm"
                      >
                          Clear sort
                      </button>
                  )}
                  <span className="text-sm text-gray-500">
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
                        className="px-6 py-4 text-left cursor-pointer hover:bg-gray-800 transition-colors group"
                        onClick={() => handleSort(col)}
                  >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                    {col === 'value' ? 'Primary Value' : col.replace('mod', 'Mod ')}
                                </span>

                                {/* Column type indicators */}
                                {col.startsWith('mod') && (
                                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded uppercase font-bold">
                                        Filter
                                    </span>
                                )}
                                {col === 'value' && (
                                    <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded uppercase font-bold">
                                        Data
                                    </span>
                                )}
                            </div>

                            {/* Sort indicator */}
                            <div className="flex flex-col ml-2">
                                <svg
                                    className={`w-3 h-3 ${sortConfig?.key === col && sortConfig.direction === 'asc'
                                            ? 'text-yellow-400'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <svg
                                    className={`w-3 h-3 -mt-1 ${sortConfig?.key === col && sortConfig.direction === 'desc'
                                            ? 'text-yellow-400'
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
                              <td key={col} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                                {/* Primary value display */}
                                <span className={`font-medium ${col === 'value'
                                        ? 'text-lg text-gray-900 font-bold'
                                        : 'text-gray-700'
                                    }`}>
                                    {value}
                                </span>

                                {/* Modulo value indicators */}
                                {col.startsWith('mod') && (
                                    <span className={`status-indicator ${numValue === 0 ? 'mod-0' :
                                            numValue === 1 ? 'mod-1' :
                                                numValue === 2 ? 'mod-2' :
                                                    numValue === 3 ? 'mod-3' :
                                                        numValue === 4 ? 'mod-4' :
                                                            'mod-5'
                                        }`}>
                                        {value}
                                    </span>
                                )}

                                {/* Primary value indicator */}
                                {col === 'value' && (
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                        Primary
                                    </span>
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
