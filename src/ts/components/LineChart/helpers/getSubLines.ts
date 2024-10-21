import IHashMap from 'ts/interfaces/HashMap';

import { IOptions, ISubLine } from '../interfaces';

function getWidth(value: number, max: number) {
  return Math.round(value * (100 / max));
}

function getFormattedOther(other: any[], normalWidth: number, options: any): ISubLine {
  let value = 0;
  const width = 100 - normalWidth;
  const titles: string[] = [];

  other.forEach((field: any) => {
    value += field.value;
    if (field.title) titles.push(field.title);
  });

  return {
    title: options.otherTitle,
    value,
    width,
    description: titles.join(', '),
  };
}

export default function getSubLines(
  details: IHashMap<number>,
  options: IOptions,
): ISubLine[] {
  const list = Object.entries(details)
    .sort((dotA, dotB) => options.order.indexOf(dotA[0]) - options.order.indexOf(dotB[0]));
  const currentMax = list.reduce((a, c) => a + c[1], 0);
  const allItems: ISubLine[] = [];
  const normal: ISubLine[] = [];
  const other: ISubLine[] = [];

  let normalWidth = 0;
  list.forEach(([title, value]: any) => {
    const width = getWidth(value || 0, currentMax);
    const field: ISubLine = { title, value, width };

    allItems.push(field);
    if (width >= options.limit) {
      normal.push(field);
      normalWidth += width;
    } else {
      other.push(field);
    }
  });

  if (other.length === 0) return normal;
  if (other.length === 1) return allItems;
  return [...normal, getFormattedOther(other, normalWidth, options)]
    .filter((item: any) => item.width > 1);
}
