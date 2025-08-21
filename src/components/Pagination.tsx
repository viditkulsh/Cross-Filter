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
          <div className="flex items-center justify-between">
              {/* Page info */}
              <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                      Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                      <span className="font-semibold text-gray-900">{totalPages}</span>
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block">
                      Navigate through data pages
                  </span>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center space-x-2">
                  {/* First page */}
                  <button
                      onClick={() => onPageChange(1)}
                      disabled={currentPage === 1}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      title="First page"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                  </button>

                  {/* Previous page */}
                  <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Previous page"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                      {pageNumbers.map((page, index) => {
                          if (page === '...') {
                              return (
                                  <span key={`dots-${index}`} className="px-2 py-1 text-gray-400">
                                      ...
                                  </span>
                              );
                          }

                          const pageNum = page as number;
                          const isActive = pageNum === currentPage;

                          return (
                              <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
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
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Next page"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </button>

                  {/* Last page */}
                  <button
                      onClick={() => onPageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="bi-button-secondary disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Last page"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                  </button>

                  {/* Page jump input */}
                  <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
                      <span className="text-sm text-gray-600 hidden sm:block">Go to:</span>
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
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Page"
                      />
                  </div>
              </div>
      </div>
    </div>
  );
};

