import { useData } from '../context/DataContext';
import { BarChart3 } from 'lucide-react';

const ChartPanel = () => {
  const { filteredData, columns } = useData();

  // Get numeric columns for charts
  const numericColumns = columns.filter(col => {
    if (filteredData.length === 0) return false;
    return typeof filteredData[0][col] === 'number';
  });

  // Create distribution data for the first numeric column
  const createDistributionData = (column: string) => {
    const counts: { [key: string]: number } = {};
    filteredData.forEach(row => {
      const value = String(row[column]);
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([value, count]) => ({ name: value, count }))
      .sort((a, b) => Number(a.name) - Number(b.name))
      .slice(0, 10); // Limit to top 10 for readability
  };

  if (numericColumns.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Numeric Data Available</h3>
          <p className="text-gray-500">
            Charts will appear when numeric columns are available in your dataset.
          </p>
        </div>
      </div>
    );
  }

  const primaryColumn = numericColumns[0];
  const secondaryColumn = numericColumns[1] || primaryColumn;

  const barData = createDistributionData(primaryColumn);
  const pieData = createDistributionData(secondaryColumn);

  // Simple bar chart component
  const SimpleBarChart = ({ data, title }: { data: any[], title: string }) => {
    const maxCount = Math.max(...data.map(d => d.count));
    
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 text-sm text-gray-600 font-medium">
                  {item.name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div
                    className="bg-orange-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      {item.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Simple pie chart component
  const SimplePieChart = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
    
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {data.map((item, index) => {
              const percentage = ((item.count / total) * 100).toFixed(1);
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {item.count}
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SimpleBarChart 
        data={barData} 
        title={`Distribution of ${primaryColumn.charAt(0).toUpperCase() + primaryColumn.slice(1)}`}
      />
      <SimplePieChart 
        data={pieData} 
        title={`Composition of ${secondaryColumn.charAt(0).toUpperCase() + secondaryColumn.slice(1)}`}
      />
    </div>
  );
};

export default ChartPanel;
