import { useDataContext } from '../context/DataContext';
import { useMemo, useState } from 'react';

export const DataTable = () => {
  const { filteredData } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Get all columns from the first row
  const columns = useMemo(() => {
    if (filteredData.length === 0) return [];
    return Object.keys(filteredData[0]);
  }, [filteredData]);

  // Paginate data for virtual scrolling
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data Available</h3>
        <p className="text-gray-500">Apply filters to see data or check if the dataset loaded correctly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="table-gradient overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="table-header">
                {columns.map((col, index) => (
                  <th 
                    key={col} 
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{col.replace('mod', 'Mod ')}</span>
                      {col.startsWith('mod') && (
                        <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                          Filter
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="table-row fade-in"
                  style={{ animationDelay: `${rowIndex * 0.02}s` }}
                >
                  {columns.map(col => (
                    <td key={col} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm ${col === 'value' ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                          {row[col]}
                        </span>
                        {col.startsWith('mod') && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                            {row[col]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-3 border border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * rowsPerPage, filteredData.length)}
            </span>{' '}
            of <span className="font-medium">{filteredData.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
