import { IPagination } from 'ts/interfaces/Pagination';

export function getMaxSubValues(
  response: IPagination<any>,
  properties: string[],
  subProperty: string = 'length',
) {
  const list = response.content;
  const max = (new Array(properties.length)).fill(0);
  const k = properties.length - 1;
  for (let l = list.length - 1; l >= 0; l--) {
    for (let i = k; i >= 0; i--) {
      const value = list[l]?.[properties[i]]?.[subProperty];
      max[i] = value > max[i] ? value : max[i];
    }
  }
  return max;
}

export function getMaxValues(response: IPagination<any>, properties: string[]) {
  const list = response.content;
  const max = (new Array(properties.length)).fill(0);
  const k = properties.length - 1;
  for (let l = list.length - 1; l >= 0; l--) {
    for (let i = k; i >= 0; i--) {
      const value = list[l]?.[properties[i]];
      max[i] = value > max[i] ? value : max[i];
    }
  }
  return max;
}

export function getMax(response: IPagination<any>, property: string, subProperty?: string) {
  return Math.max(...response.content.map((row: any) => (subProperty
    ? (row[property][subProperty] || 0)
    : (row[property] || 0)
  )));
}

export function getMaxByLength(response: IPagination<any>, property: string) {
  return getMax(response, property, 'length');
}
