import { StatisticsDay } from 'ts/helpers/StatisticsByCommits/components/month/day';

import { Filters } from '../../../interfaces/Filters';

const COLORS = {
  WORKS: [
    '#4162B5', // 0 1
    '#617DC1', // 1 0.8
    '#718AC6', // 2 0.7
    '#8198CD', // 3 0.6
    '#91A6D2', // 4 0.5
    '#A2B3D8', // 5 0.4
    '#B2C1DE', // 6 0.3
    '#C2CEE4', // 7 0.2
  ],
  WEEKEND: [
    '#ED675F', // 1
    '#EB817C', // 0.8
    '#E98E8A', // 0.7
    '#E89B99', // 0.6
    '#E7A8A7', // 0.5
    '#E7B5B6', // 0.4
    '#E6C3C4', // 0.3
    '#E4CFD3', // 0.2
  ],
  SELECTED: [
    '#0E5C0C', // 1
    '#2B9829', // 0.8
    '#4FBF4C', // 0.7
    '#6DD26A', // 0.6
    '#88E185', // 0.5
    '#ACE4AA', // 0.4
    '#C2ECC1', // 0.3
    '#E1F7E1', // 0.2
  ],
};

export function getColor(colors: string[], opacity: number): string {
  if (opacity >= 0.8) return colors[1];
  if (opacity >= 0.6) return colors[3];
  if (opacity >= 0.4) return colors[5];
  return colors[7];
}

export function getColorList(dayNumber: number, filters: Filters, dayInfo: StatisticsDay) {
  // @ts-ignore
  const author = filters?.authors?.[0]?.title;
  if (author && dayInfo.commitsNumberByAuthor.has(author)) {
    return COLORS.SELECTED;
  }
  // @ts-ignore
  const type = filters?.types?.[0]?.title;
  if (type && dayInfo.commitsNumberByType.has(type)) {
    return COLORS.SELECTED;
  }
  const weekend = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41];
  if (weekend.includes(dayNumber)) {
    return COLORS.WEEKEND;
  }
  return COLORS.WORKS;
}
