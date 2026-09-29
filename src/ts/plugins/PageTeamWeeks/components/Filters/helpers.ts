import type Filter from 'ts/components/Layout/Search/interfaces/Filter';

export function getDefaultFilters(rows: any): Filter {
  const firstWeek = rows[0];
  return {
    week: firstWeek.week,
    index: 0,
  };
}
