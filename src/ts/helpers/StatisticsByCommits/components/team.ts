import IHashMap from 'ts/interfaces/HashMap';

import StatisticsByAuthor, { StatisticsAuthor } from './author';

const PROPERTIES_FOR_SUMMATION = [
  'commits',
  'totalTaskInDay',
  'totalWeekendsDaysWithCommits',
  'totalDaysWithCommits',
  'totalMoney',
  'totalMoneyLosses',
  'totalMoneyWorked',
  'totalMoneyInWeekend',
] as const;

export interface StatisticsTeam {
  commits: number;
  totalTaskInDay: number;
  totalWeekendsDaysWithCommits: number;
  totalDaysWithCommits: number;
  totalMoney: number;
  totalMoneyLosses: number;
  totalMoneyWorked: number;
  totalMoneyInWeekend: number;
  commitsByDayAndHour: number[][];
  commitsByDay: number[];
  wordStatistics: [string, number][];
}

export default class StatisticsByTeam {
  totalInfo: StatisticsTeam = {
    commits: 0,
    totalTaskInDay: 0,
    totalWeekendsDaysWithCommits: 0,
    totalDaysWithCommits: 0,
    totalMoney: 0,
    totalMoneyLosses: 0,
    totalMoneyWorked: 0,
    totalMoneyInWeekend: 0,
    commitsByDayAndHour: [],
    commitsByDay: [],
    wordStatistics: [],
  };

  clear() {
    this.totalInfo = {
      commits: 0,
      totalTaskInDay: 0,
      totalWeekendsDaysWithCommits: 0,
      totalDaysWithCommits: 0,
      totalMoney: 0,
      totalMoneyLosses: 0,
      totalMoneyWorked: 0,
      totalMoneyInWeekend: 0,
      commitsByDayAndHour: [],
      commitsByDay: [],
      wordStatistics: [],
    };
  }

  updateTotalInfo(statisticsByAuthor: StatisticsByAuthor) {
    const refPropertySum: IHashMap<number> = Object.fromEntries(
      PROPERTIES_FOR_SUMMATION.map((property) => [property, 0]),
    );
    const commitsByDayAndHour = (new Array(7)).fill(1).map(() => (new Array(24)).fill(0));
    const commitsByDay = (new Array(7)).fill(0);
    const refWordCount: IHashMap<number> = {};

    statisticsByAuthor.totalInfo.forEach((author: StatisticsAuthor) => {
      PROPERTIES_FOR_SUMMATION.forEach((property) => {
        if (property === 'totalTaskInDay' && (author.isStaff || author.isDismissed)) {
          return;
        }
        refPropertySum[property] += author[property] || 0;
      });

      author.commitsByDayAndHour.forEach((commits: number[], day: number) => {
        commits.forEach((commitsByHour: number, hour: number) => {
          commitsByDayAndHour[day][hour] += commitsByHour;
          commitsByDay[day] += commitsByHour;
        });
      });

      author.wordStatistics.slice(0, 45).forEach(([key, value]: [string, number]) => {
        refWordCount[key] = refWordCount[key]
          ? (refWordCount[key] + value)
          : value;
      });
    });

    this.totalInfo = {
      commits: refPropertySum.commits,
      totalTaskInDay: refPropertySum.totalTaskInDay,
      totalWeekendsDaysWithCommits: refPropertySum.totalWeekendsDaysWithCommits,
      totalDaysWithCommits: refPropertySum.totalDaysWithCommits,
      totalMoney: refPropertySum.totalMoney,
      totalMoneyLosses: refPropertySum.totalMoneyLosses,
      totalMoneyWorked: refPropertySum.totalMoneyWorked,
      totalMoneyInWeekend: refPropertySum.totalMoneyInWeekend,
      commitsByDayAndHour,
      commitsByDay,
      wordStatistics: Object.entries(refWordCount)
        .sort((dotA, dotB) => dotB[1] - dotA[1]),
    };
  }
}
