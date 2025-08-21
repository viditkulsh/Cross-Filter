
import { useEffect, useState } from 'react';
import { DataProvider, useDataContext } from './context/DataContext';
import { parseCSV, addModuloColumns } from './utils/csvParser';
import { FilterDropdown } from './components/FilterDropdown';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';

const MODS = [3, 4, 5, 6];
const MOD_COLUMNS = MODS.map(m => `mod${m}`);

function Dashboard() {
  const { filteredData, originalData, filters, setOriginalData, setFilters } = useDataContext();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
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
  const startRow = (page - 1) * rowsPerPage + 1;
  const endRow = Math.min(page * rowsPerPage, filteredData.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center card-gradient p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-gradient"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Enhanced Sidebar with Visual Hierarchy */}
        <aside className="w-full lg:w-96 bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-xl border-r border-white/30 shadow-2xl">
          <div className="p-8">
            {/* Header Section with Clear Hierarchy */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-xl">🎯</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Filters
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">Dynamic cross-filtering system</p>
                </div>
              </div>

              {/* Filter Status Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Filter Status</span>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full transition-colors duration-200 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {hasActiveFilters ? `${activeFilterCount} filters active` : 'No filters applied'}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${hasActiveFilters ? 'bg-green-400' : 'bg-gray-300'} shadow-sm`}></div>
                </div>
                {isFiltering && (
                  <div className="mt-2 text-xs text-blue-600 font-medium flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mr-2"></div>
                    Updating results...
                  </div>
                )}
              </div>
            </div>
            
            {/* Filter Groups with Enhanced Spacing */}
            <div className="space-y-8 slide-in">
              {MOD_COLUMNS.map((col, index) => {
                const isActive = filters[col]?.length > 0;
                return (
                  <div 
                    key={col} 
                    className={`fade-in transition-all duration-300 ${isActive ? 'transform scale-105' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Enhanced Filter Label */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <label className="block">
                          <span className="text-base font-bold text-gray-800 uppercase tracking-wide">
                            {col.replace('mod', 'Modulo ')}
                          </span>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              isActive 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}>
                              {isActive ? `${filters[col].length} selected` : 'All values'}
                            </span>
                            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                              Cross-filtered
                            </span>
                          </div>
                        </label>
                        {isActive && (
                          <button
                            onClick={() => setFilters({ ...filters, [col]: [] })}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200"
                            title="Clear this filter"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Filter Dropdown with Enhanced Styling */}
                    <div className={`transition-all duration-300 ${isActive ? 'ring-2 ring-blue-200 ring-opacity-50' : ''}`}>
                      <FilterDropdown column={col} options={[]} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50 shadow-sm">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How it works</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Select values in any filter to see how other filters update automatically. 
                    This is cross-filtering in action!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Enhanced Header with Better Hierarchy */}
          <header className="bg-gradient-to-r from-white/95 to-white/85 backdrop-blur-xl border-b border-white/30 shadow-xl">
            <div className="p-8">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="fade-in mb-6 xl:mb-0">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Cross-Filter Intelligence Dashboard
                  </h1>
                  <p className="text-gray-600 text-lg font-medium">Advanced data filtering and visualization</p>
                </div>
                
                {/* Enhanced Statistics Panel */}
                <div className="flex flex-wrap gap-4 fade-in">
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-lg">
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Dataset</div>
                    <div className="text-2xl font-bold text-gray-800">{originalData.length}</div>
                    <div className="text-xs text-gray-400">Total records</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-lg">
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Filtered</div>
                    <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
                    <div className="text-xs text-gray-400">Matching records</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-200/50 shadow-lg">
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Page</div>
                    <div className="text-2xl font-bold text-purple-600">{page} of {totalPages}</div>
                    <div className="text-xs text-gray-400">Current view</div>
                  </div>
                </div>
              </div>

              {/* Results Summary with Proper Grammar */}
              {filteredData.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">
                        Showing {startRow} to {endRow} of {filteredData.length} results
                      </span>
                      {hasActiveFilters && (
                        <span className="ml-2 text-blue-600">
                          (filtered from {originalData.length} total)
                        </span>
                      )}
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-sm"
                      >
                        View All Data
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Enhanced Data Content */}
          <div className="flex-1 p-8 overflow-hidden">
            <div className="h-full card-gradient p-8 fade-in shadow-xl">
              <div className="h-full overflow-auto">
                <DataTable />
              </div>
              <div className="mt-8 border-t border-gray-200/50 pt-6">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </div>
          </div>
        </main>
      </div>
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
