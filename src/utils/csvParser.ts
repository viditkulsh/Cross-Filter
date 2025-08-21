import Papa from 'papaparse';

export function parseCSV(csvString: string) {
  const { data } = Papa.parse(csvString, { header: true, skipEmptyLines: true });
  return data as Array<Record<string, string>>;
}

export function addModuloColumns(data: Array<Record<string, string>>, mods: number[] = [3,4,5,6]) {
  return data.map(row => {
    const value = Number(row.value);
    const newRow = { ...row };
    mods.forEach(mod => {
      newRow[`mod${mod}`] = (value % mod).toString();
    });
    return newRow;
  });
}
