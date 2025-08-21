import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

      for (
          let i = Math.max(2, currentPage - delta);
          i <= Math.min(totalPages - 1, currentPage + delta);
        i++
    ) {
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
    } else {
        rangeWithDots.push(totalPages);
    }

      return rangeWithDots;
  };

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Previous
              </button>
              <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Next
              </button>
          </div>

          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                  <p className="text-sm text-gray-700">
                      Page <span className="font-medium">{currentPage}</span> of{' '}
                      <span className="font-medium">{totalPages}</span>
                  </p>
              </div>
              <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                          onClick={() => onPageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-5 w-5" />
                      </button>

                      {visiblePages.map((page, index) => (
                          <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={typeof page !== 'number'}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                            ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                            : typeof page === 'number'
                                ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                : 'bg-white border-gray-300 text-gray-300 cursor-default'
                        }`}
                >
                    {page}
                </button>
            ))}

                      <button
                          onClick={() => onPageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          <span className="sr-only">Next</span>
                          <ChevronRight className="h-5 w-5" />
                      </button>
                  </nav>
              </div>
      </div>
    </div>
  );
};

export default Pagination;

