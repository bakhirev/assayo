import { IPagination } from 'ts/interfaces/Pagination';

export function getMax(response: IPagination<any>, property: string, subProperty?: string) {
  return Math.max(...response.content.map((row: any) => (subProperty
    ? (row[property][subProperty] || 0)
    : (row[property] || 0)
  )));
}

export function getMaxByLength(response: IPagination<any>, property: string) {
  return getMax(response, property, 'length');
}
