import IHashMap from 'ts/interfaces/HashMap';

const PROPERTIES = [
  { property: 'daysWorked', sort: 1 },
  { property: 'daysLosses', sort: -1 },
  { property: 'commits', sort: 1 },
  { property: 'tasks', sort: 1 },
  { property: 'moneyAll', sort: 1 },
  { property: 'moneyWorked', sort: 1 },
  { property: 'moneyLosses', sort: -1 },
  { property: 'weekendPayment', sort: 1 },
  {
    property: 'daysForTask',
    sort: -1,
    formatter: (user: any) => user.daysForTask && user.tasks.length ? user.daysForTask : Infinity,
  },
  {
    property: 'commitsForTask',
    sort: 1,
    formatter: (user: any) => user.tasks.length ? (user.commits / user.tasks.length) : Infinity,
  },
  {
    property: 'linesForTask',
    sort: -1,
    formatter: (user: any) => user.tasks.length ? user.changesForTask : Infinity,
  },
  {
    property: 'speedMaxTasks',
    sort: 1,
    formatter: (user: any, timestamp: any) => timestamp.tasksByTimestampCounter.max,
  },
  {
    property: 'speedMaxCommits',
    sort: 1,
    formatter: (user: any, timestamp: any) => timestamp.commitsByTimestampCounter.max,
  },
  {
    property: 'moneyForTask',
    sort: 1,
    formatter: (user: any) => user.moneyWorked / user.tasks.length,
  },
  {
    property: 'moneyForCommit',
    sort: 1,
    formatter: (user: any) => user.moneyWorked / user.commits,
  },
];

function getValue(config: any, user: any, dataGripByTimestamp: any) {
  const timestamp = dataGripByTimestamp.statisticByAuthor[user.author];
  if (config.formatter) {
    return config.formatter(user, timestamp);
  }

  const value = user[config.property]
    || timestamp[config.property]
    || 0;

  return Array.isArray(value)
    ? value?.length
    : value;
}

export default class DataGripByScoring {
  total: IHashMap<number> = {};

  statisticByName: IHashMap<any> = {};

  constructor() {
    this.clear();
  }

  clear() {
    this.total = {};
    this.statisticByName = {};
  }

  updateTotalInfo(dataGripByAuthor: any, dataGripByTimestamp: any) {
    const list = [...dataGripByAuthor.statistic];

    list.forEach((user: any) => {
      this.statisticByName[user.author] = {};
    });

    PROPERTIES.forEach((config: any) => {
      const values = list.map((user: any) => getValue(config, user, dataGripByTimestamp));

      const uniqValues = Array.from(new Set(values));
      const places = uniqValues
        .sort((a:number, b:number) => (b - a) * config.sort)
        .map((v, i) => [v, i + 1]);
      const refValuePlace = Object.fromEntries(places);

      list.forEach((user: any, index: number) => {
        const userValue = values[index];
        this.statisticByName[user.author][config.property] = refValuePlace[userValue];
      });

      this.total[config.property] = uniqValues.length;
    });
  }
}
