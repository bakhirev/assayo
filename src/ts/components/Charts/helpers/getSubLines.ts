import IHashMap from 'ts/interfaces/HashMap';

import { ISubLine } from '../interfaces';

function getWidth(value: number, max: number) {
  return Math.round(value * (100 / max));
}

function getFormattedOther(other: any[], normalWidth: number, title: string): ISubLine {
  let value = 0;
  const width = 100 - normalWidth;
  const titles: string[] = [];

  other.forEach((field: any) => {
    value += field.value;
    if (field.title) titles.push(field.title);
  });

  return {
    title,
    value,
    width,
    description: titles.join(', '),
  };
}

export default function getSubLines(
  details: IHashMap<number>,
  order?: string[],
  limit?: number,
  otherTitle?: string,
): ISubLine[] {
  const list = Object.entries(details);
  if (order?.length) {
    // TODO: тот, кого нет в order, вываливается в начало, а должен в конец
    list.sort((dotA, dotB) => order.indexOf(dotA[0]) - order.indexOf(dotB[0]));
  }

  const currentMax = list.reduce((a, c) => a + c[1], 0);
  let allItems: ISubLine[] = [];
  let normal: ISubLine[] = [];
  let other: ISubLine[] = [];

  let normalWidth = 0;
  list.forEach(([title, value]: any) => {
    const width = getWidth(value || 0, currentMax);
    const field: ISubLine = { title, value, width };

    allItems.push(field);
    if (width >= (limit || 5)) {
      normal.push(field);
      normalWidth += width;
    } else {
      other.push(field);
    }
  });

  allItems = allItems.filter((item: any) => item.width >= 1);
  normal = normal.filter((item: any) => item.width >= 1);

  if (other.length === 0) {
    return normal;
  }
  if (other.length === 1) {
    return allItems;
  }

  const totalOther = getFormattedOther(other, normalWidth, otherTitle || '...');
  return totalOther.width > 1
    ? [...normal, totalOther]
    : normal;
}
