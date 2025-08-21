import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) {
        return null;
    }

    // Generate page numbers to show
  const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta);
          i <= Math.min(totalPages - 1, currentPage + delta);
          i++) {
          range.push(i);
      }

      if (currentPage - delta > 2) {
          rangeWithDots.push(1, '...');
    } else {
          rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
          rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
          rangeWithDots.push(totalPages);
    }

      return rangeWithDots;
  };

    const pageNumbers = getPageNumbers();

  return (
      <div className="bi-card">
          <div className="flex items-center justify-between p-6">
              {/* Enhanced Page info */}
              <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                      <div>
                          <span className="text-sm text-gray-600 font-medium">
                              Page <span className="font-bold text-gray-900 text-lg">{currentPage}</span> of{' '}
                              <span className="font-bold text-gray-900 text-lg">{totalPages}</span>
                          </span>
                          <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                              Navigate through data pages
                          </p>
                      </div>
                  </div>
              </div>

              {/* Enhanced Navigation controls */}
              <div className="flex items-center space-x-3">
                  {/* First page */}
                  <button
                      onClick={() => onPageChange(1)}
                      disabled={currentPage === 1}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed p-3"
                      title="First page"
                  >
                      ⟪
                  </button>

                  {/* Previous page */}
                  <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed p-3"
                      title="Previous page"
                  >
                      ◂
                  </button>

                  {/* Enhanced Page numbers */}
                  <div className="flex items-center space-x-2">
                      {pageNumbers.map((page, index) => {
                          if (page === '...') {
                              return (
                                  <span key={`dots-${index}`} className="px-3 py-2 text-gray-400 font-bold">
                                      ⋯
                                  </span>
                              );
                          }

                          const pageNum = page as number;
                          const isActive = pageNum === currentPage;

                          return (
                              <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${isActive
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-110'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 border border-gray-200 hover:scale-105'
                          }`}
                  >
                      {pageNum}
                  </button>
                );
            })}
                  </div>

                  {/* Next page */}
                  <button
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed p-3"
                      title="Next page"
                  >
                      ▸
                  </button>

                  {/* Last page */}
                  <button
                      onClick={() => onPageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed p-3"
                      title="Last page"
                  >
                      ⟫
                  </button>

                  {/* Enhanced Page jump input */}
                  <div className="flex items-center space-x-3 ml-6 border-l border-gray-200 pl-6">
                      <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 font-medium hidden sm:block">Jump to:</span>
                      </div>
                      <input
                          type="number"
                          min="1"
                          max={totalPages}
                          value={currentPage}
                          onChange={(e) => {
                              const page = parseInt(e.target.value);
                              if (page >= 1 && page <= totalPages) {
                                  onPageChange(page);
                              }
                          }}
                          className="w-20 px-3 py-2 text-sm font-medium border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Page"
                      />
                  </div>
              </div>
      </div>
    </div>
  );
};

