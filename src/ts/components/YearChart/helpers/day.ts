import IHashMap from 'ts/interfaces/HashMap';

import IMonth from '../interfaces/Month';

export function getPercentByMax(countCommit: number, max: number) {
  const value = ((countCommit || 0) * 100) / max;
  return (value - value % 1) / 100;
}

export function getIconUrl(month: IMonth, dayInMonth: number) {
  const addPerson = month.firstDay?.[dayInMonth];
  const removePerson = month.lastDay?.[dayInMonth];
  if (addPerson && removePerson) return './assets/chart/commit.svg';
  if (removePerson) return './assets/chart/commit.svg';
  if (addPerson) return './assets/chart/commit.svg';
  return '';
}

export function getColor(isWeekend: boolean, opacity: number): string {
  const colors = isWeekend ? [
    '#ED675F', // 1
    '#EB817C', // 0.8
    '#E98E8A', // 0.7
    '#E89B99', // 0.6
    '#E7A8A7', // 0.5
    '#E7B5B6', // 0.4
    '#E6C3C4', // 0.3
    '#E4CFD3', // 0.2
  ] : [
    '#4162B5', // 0 1
    '#617DC1', // 1 0.8
    '#718AC6', // 2 0.7
    '#8198CD', // 3 0.6
    '#91A6D2', // 4 0.5
    '#A2B3D8', // 5 0.4
    '#B2C1DE', // 6 0.3
    '#C2CEE4', // 7 0.2
  ];
  if (opacity >= 0.8) return colors[1];
  if (opacity >= 0.6) return colors[3];
  if (opacity >= 0.4) return colors[5];
  return colors[7];
}

export function getDayText(events: IHashMap<any>, timestamp: string): string {
  const addEmployees = events?.firstCommit?.[timestamp];
  const removeEmployees = events?.lastCommit?.[timestamp];
  if (addEmployees && removeEmployees) return '+-';
  if (removeEmployees) return '-';
  if (addEmployees) return '+';
  return '';
}

function getRefAuthorByTime(list: any[], property: string) {
  return list.reduce((refTimeAuthor: any, item: any) => {
    if (item.isStaff) return refTimeAuthor;
    const key = item?.[property]?.timestamp;
    if (!refTimeAuthor[key]) refTimeAuthor[key] = [];
    refTimeAuthor[key].push(item.author);
    return refTimeAuthor;
  }, {});
}

export function getEvents(dataGripStore: any) {
  const list = dataGripStore.dataGrip.author.statistic;
  return {
    firstCommit: getRefAuthorByTime(list, 'firstCommit'),
    lastCommit: getRefAuthorByTime(list, 'lastCommit'),
  };
}