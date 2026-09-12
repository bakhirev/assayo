import IHashMap from 'ts/interfaces/HashMap';

import StatisticsByAuthor, { StatisticsAuthor } from './author';
import StatisticsByTimestamp, { StatisticsTimestampTotal } from './timestamp';

export interface ScoringProperty {
  property: string;
  sort: number;
  isNotStaff?: boolean;
  isNeedTasks?: boolean;
  formatter?: (user: StatisticsAuthor, timestamp: StatisticsTimestampTotal) => number;
}

const PROPERTIES: ScoringProperty[] = [
  { property: 'totalDays', sort: 1 },
  { property: 'totalDaysWithCommits', sort: 1 },
  { property: 'totalDaysWithoutCommits', sort: -1 },
  { property: 'commits', sort: 1 },

  { property: 'totalMoney', sort: 1, isNotStaff: true },
  { property: 'totalMoneyWorked', sort: 1, isNotStaff: true },
  { property: 'totalMoneyLosses', sort: -1, isNotStaff: true },
  { property: 'totalMoneyInWeekend', sort: 1, isNotStaff: true },


  { property: 'totalTasks', sort: 1, isNeedTasks: true },
  { property: 'totalTaskInDay', sort: 1, isNotStaff: true, isNeedTasks: true },
  { property: 'totalTaskInChanges', sort: 1, isNotStaff: true, isNeedTasks: true },
  { property: 'totalTaskInCommits', sort: -1, isNotStaff: true, isNeedTasks: true },
  { property: 'totalTaskInFiles', sort: -1, isNotStaff: true, isNeedTasks: true },

  {
    property: 'speedMaxTasks',
    sort: 1,
    isNotStaff: true,
    isNeedTasks: true,
    formatter: (user: StatisticsAuthor, timestamp: StatisticsTimestampTotal) => timestamp.tasksByTimestampCounter.max,
  },
  {
    property: 'speedMaxCommits',
    sort: 1,
    isNotStaff: true,
    formatter: (user: StatisticsAuthor, timestamp: StatisticsTimestampTotal) => timestamp.commitsByTimestampCounter.max,
  },
  {
    property: 'moneyForTask',
    sort: -1,
    isNotStaff: true,
    isNeedTasks: true,
    formatter: (user: StatisticsAuthor) => user.totalMoney / user.totalTasks,
  },
  {
    property: 'moneyForCommit',
    sort: -1,
    isNotStaff: true,
    formatter: (user: StatisticsAuthor) => user.totalMoney / user.commits,
  },
];

function getValues(config: ScoringProperty, statisticsByTimestamp: StatisticsByTimestamp) {
  return (user: StatisticsAuthor) => {
    const timestamp = statisticsByTimestamp.totalInfoByName[user.author];
    if ((config.isNeedTasks && !user.totalTasks)
      || (config.isNotStaff && user.isStaff)) return NaN;

    if (config.formatter) {
      return config.formatter(user, timestamp);
    }

    const value = user[config.property as keyof StatisticsAuthor]
      || timestamp?.[config.property as keyof StatisticsTimestampTotal]
      || 0;

    if (Array.isArray(value)) return value.length;
    return typeof value === 'number' ? value : 0;
  };
}

export default class StatisticsByScoring {
  total: IHashMap<number> = {};

  totalInfoByName: IHashMap<IHashMap<number>> = {};

  constructor() {
    this.clear();
  }

  clear() {
    this.total = {};
    this.totalInfoByName = {};
  }

  updateTotalInfo(statisticsByAuthor: StatisticsByAuthor, statisticsByTimestamp: StatisticsByTimestamp) {
    const list = [...statisticsByAuthor.totalInfo];

    list.forEach((user: StatisticsAuthor) => {
      this.totalInfoByName[user.author] = {};
    });

    PROPERTIES.forEach((config: ScoringProperty) => {
      const getValue = getValues(config, statisticsByTimestamp);
      const values = list
        .map(getValue)
        .filter((value: number) => !isNaN(value));

      const uniqValues = Array.from(new Set(values));
      const places = uniqValues
        .sort((a: number, b: number) => (b - a) * config.sort)
        .map((v, i) => [v, i + 1]);
      const refValuePlace = Object.fromEntries(places);

      list.forEach((user: StatisticsAuthor, index: number) => {
        const userValue = values[index];
        this.totalInfoByName[user.author][config.property] = refValuePlace[userValue];
      });

      this.total[config.property] = uniqValues.length;
    });
  }
}
