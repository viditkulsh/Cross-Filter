import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterDropdown } from '../components/FilterDropdown';
import { DataProvider } from '../context/DataContext';

// Mock DataContext with test data
const MockDataProvider = ({ children }: { children: React.ReactNode }) => (
  <DataProvider>
    {children}
  </DataProvider>
);

describe('FilterDropdown', () => {
  test('renders select element', () => {
    const { container } = render(
      <MockDataProvider>
        <FilterDropdown column="mod3" options={['0', '1', '2']} />
      </MockDataProvider>
    );
    
    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('multiple');
  });

  test('renders options correctly', () => {
    const { container } = render(
      <MockDataProvider>
        <FilterDropdown column="mod3" options={['0', '1', '2']} />
      </MockDataProvider>
    );
    
    const options = container.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(0);
  });

  test('handles empty options array', () => {
    const { container } = render(
      <MockDataProvider>
        <FilterDropdown column="mod3" options={[]} />
      </MockDataProvider>
    );
    
    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
  });
});
