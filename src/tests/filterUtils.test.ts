import { applyFilters } from '../utils/filterUtils';

describe('applyFilters', () => {
  const data = [
    { value: 17, mod3: '2', mod4: '1', mod5: '2', mod6: '5' },
    { value: 23, mod3: '2', mod4: '3', mod5: '3', mod6: '5' },
    { value: 42, mod3: '0', mod4: '2', mod5: '2', mod6: '0' },
  ];

  it('returns all data if filters are empty', () => {
    expect(applyFilters(data, { mod3: [], mod4: [], mod5: [], mod6: [] })).toEqual(data);
  });

  it('filters by one column', () => {
    expect(applyFilters(data, { mod3: ['2'], mod4: [], mod5: [], mod6: [] })).toEqual([
      data[0], data[1]
    ]);
  });

  it('filters by multiple columns', () => {
    expect(applyFilters(data, { mod3: ['2'], mod4: ['1'], mod5: [], mod6: [] })).toEqual([
      data[0]
    ]);
  });
});
