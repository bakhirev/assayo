import { ONE_DAY } from 'ts/helpers/formatter';

export function getDaysBetween(from: number, to: number) {
  return to > from ? Math.ceil((to - from) / ONE_DAY) : 1;
}

export function createMap(key?: string, value?: number) {
  return new Map(key ? [[key, value ?? 1]] : []);
}

export function incrementMap(map: Map<string, number>, key?: string, value?: number) {
  if (!key) return;
  const prev = map.get(key) || 0;
  map.set(key, prev + (value ?? 1));
}

export function createUniqValues(key?: string | number) {
  return new Set(key ? [key] : []);
}

export function incrementUniqValues(map: Set<any>, key?: string | number) {
  if (key) map.add(key);
}
