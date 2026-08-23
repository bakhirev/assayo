import type Filter from 'ts/components/Layout/Search/interfaces/Filter';
import { ONE_DAY } from 'ts/helpers/formatter';

export function getDefaultFilters(rows: any, author?: string): Filter {
  const to = rows[rows.length - 1]?.milliseconds;
  const from = to - ONE_DAY * 7;
  return {
    author: author || '',
    from,
    to,
  };
}

export function getOnFilter(filters: Filter) {
  return (item: any): boolean => {
    if (filters.from && item.milliseconds < filters.from) return false;
    if (filters.to && item.milliseconds > filters.to) return false;
    return true;
  };
}

