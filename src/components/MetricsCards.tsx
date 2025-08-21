import { useData } from '../context/DataContext';
import { BarChart3, TrendingUp, Database, Filter } from 'lucide-react';

const MetricsCards = () => {
  const { data, filteredData, filters } = useData();

  const totalRecords = data.length;
  const filteredRecords = filteredData.length;
  const filterPercentage = totalRecords > 0 ? (filteredRecords / totalRecords * 100).toFixed(1) : 0;
  const activeFilters = Object.values(filters).filter(f => f.length > 0).length;

  const metrics = [
    {
      title: 'Total Records',
      value: totalRecords.toLocaleString(),
      icon: Database,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Filtered Records',
      value: filteredRecords.toLocaleString(),
      icon: Filter,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Filter Coverage',
      value: `${filterPercentage}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Active Filters',
      value: activeFilters.toString(),
      icon: BarChart3,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.textColor}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
