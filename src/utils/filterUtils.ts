export type Filters = Record<string, string[]>;

export function applyFilters<T extends Record<string, any>>(data: T[], filters: Filters): T[] {
  return data.filter(row => {
    return Object.entries(filters).every(([col, vals]) => {
      if (!vals.length) return true;
      return vals.includes(row[col]?.toString());
    });
  });
}
