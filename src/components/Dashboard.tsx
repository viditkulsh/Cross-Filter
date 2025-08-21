import { useData } from '../context/DataContext';
import FilterPanel from './FilterPanel';
import DataTable from './DataTable';
import MetricsCards from './MetricsCards';
import ChartPanel from './ChartPanel';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import { BarChart3, Filter, RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const { loading, error, filteredData, data, clearFilters } = useData();

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen message={error} />;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <BarChart3 className="h-8 w-8 text-orange-500" />
                            <h1 className="text-2xl font-bold text-gray-900">
                                Business Intelligence Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Showing {filteredData.length} of {data.length} records
                            </span>
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="px-6 py-4 border-b">
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-5 w-5 text-orange-500" />
                                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <FilterPanel />
                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Metrics Cards */}
                        <MetricsCards />

                        {/* Charts */}
                        <ChartPanel />

                        {/* Data Table */}
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="px-6 py-4 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">Data View</h2>
                            </div>
                            <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
