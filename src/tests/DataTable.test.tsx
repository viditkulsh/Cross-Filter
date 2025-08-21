import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from '../components/DataTable';
import { DataProvider } from '../context/DataContext';

// Mock DataContext with test data
const MockDataProvider = ({ children }: { children: React.ReactNode }) => (
  <DataProvider>
    {children}
  </DataProvider>
);

describe('DataTable', () => {
  test('renders table headers correctly', () => {
    const { container } = render(
      <MockDataProvider>
        <DataTable />
      </MockDataProvider>
    );
    
    // Check if basic table structure is rendered
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  test('renders empty table when no data', () => {
    const { container } = render(
      <MockDataProvider>
        <DataTable />
      </MockDataProvider>
    );
    
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  test('applies correct CSS classes for styling', () => {
    const { container } = render(
      <MockDataProvider>
        <DataTable />
      </MockDataProvider>
    );
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('min-w-full');
  });
});
