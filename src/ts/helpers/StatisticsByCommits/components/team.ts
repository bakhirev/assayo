const PROPERTIES_FOR_SUMMATION = [
  'commits',
  'totalTaskInDay',
  'totalWeekendsDaysWithCommits',
  'totalDaysWithCommits',
  'totalMoney',
  'totalMoneyLosses',
  'totalMoneyWorked',
  'totalMoneyInWeekend',
];

export default class StatisticsByTeam {
  totalInfo: any = {};

  clear() {
    this.totalInfo = {};
  }

  updateTotalInfo(statisticsByAuthor: any) {
    const statistic = {
      ...Object.fromEntries(PROPERTIES_FOR_SUMMATION.map(i => [i, 0])),
      commitsByDayAndHour: (new Array(7)).fill(1).map(() => (new Array(24)).fill(0)),
      commitsByDay: (new Array(7)).fill(0),
      wordStatistics: {},
    };

    statisticsByAuthor.totalInfo.forEach((author: any) => {
      PROPERTIES_FOR_SUMMATION.forEach((property) => {
        if (property === 'totalTaskInDay' && (author.isStaff || author.isDismissed)) {
          return;
        }
        statistic[property] += author[property] || 0;
      });

      author.commitsByDayAndHour.forEach((commits: number[], day: number) => {
        commits.forEach((commitsByHour: number, hour: number) => {
          statistic.commitsByDayAndHour[day][hour] += commitsByHour;
          statistic.commitsByDay[day] += commitsByHour;
        });
      });

      author.wordStatistics.slice(0, 45).forEach(([key, value]: [string, number]) => {
        statistic.wordStatistics[key] = statistic.wordStatistics[key]
          ? (statistic.wordStatistics[key] + value)
          : value;
      });
    });

    statistic.wordStatistics = Object.entries(statistic.wordStatistics)
      .sort((dotA: any, dotB: any) => dotB[1] - dotA[1]);

    this.totalInfo = statistic;
  }
}
