import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

interface DataRow {
  [key: string]: string | number;
}

interface FilterState {
  [key: string]: (string | number)[];
}

interface DataContextType {
  data: DataRow[];
  filteredData: DataRow[];
  columns: string[];
  filters: FilterState;
  setFilter: (column: string, values: (string | number)[]) => void;
  clearFilters: () => void;
  loading: boolean;
  error: string | null;
  uniqueValues: { [key: string]: (string | number)[] };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/dataset_small.csv');
        if (!response.ok) {
          throw new Error('Failed to load dataset');
        }

        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length === 0) {
          throw new Error('Empty dataset');
        }

        const headers = lines[0].split(',');
        setColumns(headers);

        const rows = lines.slice(1).map(line => {
          const values = line.split(',');
          const row: DataRow = {};
          headers.forEach((header, index) => {
            const value = values[index];
            // Try to parse as number, otherwise keep as string
            row[header] = isNaN(Number(value)) ? value : Number(value);
          });
          return row;
        });

        setData(rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate filtered data
  const filteredData = useMemo(() => {
    let filtered = data;

    Object.entries(filters).forEach(([column, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter(row =>
          selectedValues.includes(row[column])
        );
      }
    });

    return filtered;
  }, [data, filters]);

  // Calculate unique values for each column
  const uniqueValues = useMemo(() => {
    const values: { [key: string]: (string | number)[] } = {};

    columns.forEach(column => {
      const unique = Array.from(new Set(data.map(row => row[column])));
      values[column] = unique.sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });
    });

    return values;
  }, [data, columns]);

  const setFilter = (column: string, values: (string | number)[]) => {
    setFilters(prev => ({
      ...prev,
      [column]: values
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <DataContext.Provider value={{
      data,
      filteredData,
      columns,
      filters,
      setFilter,
      clearFilters,
      loading,
      error,
      uniqueValues
    }}>
      {children}
    </DataContext.Provider>
  );
};
