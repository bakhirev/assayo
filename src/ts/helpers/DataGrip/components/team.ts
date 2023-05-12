import DataGripByAuthor from './author';

const PROPERTIES_FOR_SUMMATION = [
  'commits',
  'daysForTask',
  'daysAll',
  'daysLosses',
  'daysWorked',
  'moneyAll',
  'moneyLosses',
  'moneyWorked',
];

export default class DataGripByTeam {
  statistic: any = {};

  clear() {
    this.statistic = {};
  }

  updateTotalInfo(dataGripByAuthor: any) {
    const statistic = {
      ...Object.fromEntries(PROPERTIES_FOR_SUMMATION.map(i => [i, 0])),
      wordStatistics: {},
      commitsByDayAndHour: DataGripByAuthor.getDefaultCommitsByDayAndHour(),
      commitsByDayAndHourTotal: [],
    };

    dataGripByAuthor.statistic.forEach((author: any) => {
      PROPERTIES_FOR_SUMMATION.forEach((property) => {
        statistic[property] += author[property] || 0;
      });
      author.commitsByDayAndHour.forEach((commits: any[], day: number) => {
        commits.forEach((commitsByHour: any, hour: number) => {
          statistic.commitsByDayAndHour[day][hour] += commitsByHour;
        });
      });
      author.wordStatistics.slice(0, 45).forEach(([key, value]: [string, number]) => {
        statistic.wordStatistics[key] = statistic.wordStatistics[key]
          ? (statistic.wordStatistics[key] + value)
          : value;
      });
    });

    statistic.commitsByDayAndHourTotal = DataGripByAuthor.getTotalCommitsByDayAndHour(statistic.commitsByDayAndHour);
    statistic.wordStatistics = Object.entries(statistic.wordStatistics)
      .sort((dotA: any, dotB: any) => dotB[1] - dotA[1]);

    this.statistic = statistic;
  }
}
