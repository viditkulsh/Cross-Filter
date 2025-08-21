import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { applyFilters } from '../utils/filterUtils';
import type { Filters } from '../utils/filterUtils';

export interface DataContextType {
  originalData: any[];
  filteredData: any[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  setOriginalData: (data: any[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({});

  const filteredData = useMemo(() => applyFilters(originalData, filters), [originalData, filters]);

  return (
    <DataContext.Provider value={{ originalData, filteredData, filters, setFilters, setOriginalData }}>
      {children}
    </DataContext.Provider>
  );
};

export function useDataContext() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within a DataProvider');
  return ctx;
}
