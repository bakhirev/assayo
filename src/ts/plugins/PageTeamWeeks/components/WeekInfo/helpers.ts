import { StatisticsCommonTotal } from 'ts/helpers/StatisticsByCommits/components/weeks/common';
import IHashMap from 'ts/interfaces/HashMap';
import MinMaxCounter from 'ts/helpers/StatisticsByCommits/helpers/MinMaxCounter';
import { StatisticsWeekTotal } from 'ts/helpers/StatisticsByCommits/components/weeks';

export function getMinMaxStatistic(authors: IHashMap<StatisticsCommonTotal>): IHashMap<MinMaxCounter> {
  const totalTasks = new MinMaxCounter();
  const totalDaysWithoutCommits = new MinMaxCounter();

  for (const name in authors) {
    const statistic = authors[name];
    totalTasks.update(statistic.totalTasks, name);
    totalDaysWithoutCommits.update(statistic.totalDaysWithoutCommits, name);
  }

  return {
    totalTasks,
    totalDaysWithoutCommits,
  };
}

export function getMiddleValues(weeks: StatisticsWeekTotal[], index: number): IHashMap<number> {
  const DEEP = 4;
  const prevWeeks = weeks.slice(index + 1, index + DEEP + 1);
  const realDeep = prevWeeks.length;

  const totalTasks = prevWeeks.reduce((sum, week) => sum + week.totalTasks, 0) / realDeep;
  const totalDaysWithoutCommits = prevWeeks.reduce((sum, week) => sum + week.totalDaysWithoutCommits, 0) / realDeep;
  const totalChanges = prevWeeks.reduce((sum, week) => sum + week.totalChanges, 0) / realDeep;

  return {
    totalTasks,
    totalDaysWithoutCommits,
    totalChanges,
  };
}
