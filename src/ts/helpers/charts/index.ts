import { GROUPS_BY_DAYS, ORDER_BY_DAYS, getDetailsByDays } from './byDays';
import { GROUPS_BY_YEARS, ORDER_BY_YEARS, getDetailsByYears } from './byYears';
export { getMaxSubValues, getMaxValues, getMaxByLength } from './getMax';

type ReturnType = [
  (r: any[], p: string) => ({ details: Record<string, number>, weightedAverage: number }),
  string[],
  Record<string, string>,
];

export function getGroupsBy(mode: 'days' | 'years'): ReturnType {
  return mode === 'days' ? [
    getDetailsByDays,
    ORDER_BY_DAYS,
    GROUPS_BY_DAYS,
  ] : [
    getDetailsByYears,
    ORDER_BY_YEARS,
    GROUPS_BY_YEARS,
  ];
}
