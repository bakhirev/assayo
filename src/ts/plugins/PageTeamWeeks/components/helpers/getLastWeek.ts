import IHashMap from 'ts/interfaces/HashMap';

interface AuthorValue {
  name: string;
  value: number;
}

export function getAuthorWithMax(refNameValue?: IHashMap<number>): AuthorValue | null {
  if (!refNameValue) return null;

  let name = '';
  let value = 0;
  for (const key in refNameValue) {
    if (refNameValue[key] > value) {
      name = key;
      value = refNameValue[key];
    }
  }

  return value ? { name, value } : null;
}

export function isAboveAverage(weeks: any[]) {
  const prevCount = Math.min((weeks?.length || 0) - 1, 4);
  if (prevCount < 1) return false;

  let sum = 0;
  for (let i = 1; i <= prevCount; i += 1) sum += weeks[i].tasks || 0;
  return weeks[0].tasks > (sum / prevCount);
}
