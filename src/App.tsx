
import { useEffect, useState } from 'react';
import { DataProvider, useDataContext } from './context/DataContext';
import { parseCSV, addModuloColumns } from './utils/csvParser';
import { FilterDropdown } from './components/FilterDropdown';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { ProgressBar } from './components/ProgressBar';

const MODS = [3, 4, 5, 6];
const MOD_COLUMNS = MODS.map(m => `mod${m}`);

function Dashboard() {
  const { filteredData, originalData, filters, setOriginalData, setFilters } = useDataContext();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const rowsPerPage = 100;

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(filterArray => filterArray.length > 0);
  const activeFilterCount = Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);

  // Load CSV on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/dataset_small.csv');
        if (!response.ok) {
          throw new Error('Failed to load dataset');
        }
        const csv = await response.text();
        const parsed = parseCSV(csv);
        const withMods = addModuloColumns(parsed, MODS);
        setOriginalData(withMods);
        
        // Initialize filters
        const initial: Record<string, string[]> = {};
        MOD_COLUMNS.forEach(col => { initial[col] = []; });
        setFilters(initial);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setOriginalData, setFilters]);

  // Show filtering feedback
  useEffect(() => {
    if (hasActiveFilters) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [filters, hasActiveFilters]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters: Record<string, string[]> = {};
    MOD_COLUMNS.forEach(col => { clearedFilters[col] = []; });
    setFilters(clearedFilters);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const filteringPercentage = originalData.length > 0 ? (filteredData.length / originalData.length) * 100 : 0;

  if (loading) {
    return <LoadingScreen message="Loading Business Intelligence Dashboard..." />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Modern Filter Panel */}
        <aside className={`filter-panel w-80 ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="p-6">
            {/* Filter Panel Header */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Smart Filters</h2>
                  <p className="text-sm text-gray-500">Cross-filtering enabled</p>
                </div>
              </div>

              {/* Filter Status Card */}
              <div className="bi-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${hasActiveFilters ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      {hasActiveFilters ? `${activeFilterCount} filters active` : 'No active filters'}
                    </span>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Filtering Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data filtered</span>
                    <span className="font-medium text-gray-900">{filteringPercentage.toFixed(1)}%</span>
                  </div>
                  <ProgressBar
                    progress={filteringPercentage}
                    color="blue"
                    size="sm"
                  />
                </div>

                {isFiltering && (
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <div className="loading-spinner mr-2"></div>
                    Processing filters...
                  </div>
                )}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="space-y-6">
              {MOD_COLUMNS.map((col, index) => {
                const isActive = filters[col]?.length > 0;
                return (
                  <div key={col} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          {col.replace('mod', 'Modulo ')}
                        </label>
                        {isActive && (
                          <span className="status-indicator status-active">
                            {filters[col].length} selected
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`filter-item p-1 ${isActive ? 'active' : ''}`}>
                      <FilterDropdown column={col} options={[]} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex">
                <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Cross-filtering</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Selecting values in one filter automatically updates available options in other filters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="bi-button-secondary mr-4 md:hidden"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Business Intelligence Dashboard</h1>
                  <p className="text-sm text-gray-600">Advanced data filtering and analytics</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="bi-button-secondary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear filters
                  </button>
                )}
                <button className="bi-button-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export data
                </button>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bi-card p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Records</div>
                <div className="text-2xl font-bold text-gray-900">{originalData.length.toLocaleString()}</div>
              </div>

              <div className="bi-card p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Filtered Results</div>
                <div className="text-2xl font-bold text-blue-600">{filteredData.length.toLocaleString()}</div>
                <div className="mt-2">
                  <ProgressBar progress={filteringPercentage} color="blue" size="sm" />
                </div>
              </div>

              <div className="bi-card p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Active Filters</div>
                <div className="text-2xl font-bold text-green-600">{activeFilterCount}</div>
              </div>

              <div className="bi-card p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Current Page</div>
                <div className="text-2xl font-bold text-purple-600">{page} of {totalPages}</div>
              </div>
            </div>
          </header>

          {/* Data Table Section */}
          <div className="p-6">
            <div className="bi-card">
              <div className="bi-card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Data Table</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} results
                      {hasActiveFilters && <span className="text-blue-600 ml-1">(filtered from {originalData.length})</span>}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Rows per page:</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100" selected>100</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DataTable />
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Filter Backdrop */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
}

export default App;
