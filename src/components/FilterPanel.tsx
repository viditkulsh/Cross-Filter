import { useData } from '../context/DataContext';
import MultiSelect from './MultiSelect';

const FilterPanel = () => {
    const { columns, uniqueValues, filters, setFilter } = useData();

    return (
        <div className="space-y-6">
            {columns.map(column => (
                <div key={column} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                        {column.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <MultiSelect
                        options={uniqueValues[column] || []}
                        selectedValues={filters[column] || []}
                        onChange={(values) => setFilter(column, values)}
                        placeholder={`Select ${column}...`}
                    />
                </div>
            ))}
        </div>
    );
};

export default FilterPanel;
