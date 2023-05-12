import IHashMap from 'ts/interfaces/HashMap';

import { IOptions, ISubLine } from '../interfaces';

function getWidth(value: number, max: number) {
  return Math.round(value * (100 / max));
}

function getFormattedOther(other: any[], options: any): ISubLine {
  let width = 0;
  let value = 0;
  const titles: string[] = [];

  other.forEach((field: any) => {
    width += field.width;
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

  list.forEach(([title, value]: any) => {
    const width = getWidth(value || 0, currentMax);
    const field: ISubLine = { title, value, width };

    allItems.push(field);
    if (width >= options.limit) {
      normal.push(field);
    } else {
      other.push(field);
    }
  });

  if (other.length === 0) return normal;
  if (other.length === 1) return allItems;
  return [...normal, getFormattedOther(other, options)];
}
