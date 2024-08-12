import IHashMap from 'ts/interfaces/HashMap';

const PROPERTIES = [
  { property: 'daysWorked', sort: 1 },
  { property: 'daysLosses', sort: -1 },
  { property: 'commits', sort: 1 },
  { property: 'daysForTask', sort: -1 },
  { property: 'tasks', sort: 1 },
  { property: 'moneyAll', sort: 1 },
  { property: 'moneyWorked', sort: 1 },
  { property: 'moneyLosses', sort: -1 },
  { property: 'weekendPayment', sort: -1 },
];

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

  updateTotalInfo(dataGripByAuthor: any) {
    const list = [...dataGripByAuthor.statistic];

    list.forEach((user: any) => {
      this.statisticByName[user.author] = {};
    });

    PROPERTIES.forEach((config: any) => {
      const values = list.map((user: any) => {
        const value = user[config.property] || 0;
        return Array.isArray(value)
          ? value?.length
          : value;
      });

      const uniqValues = Array.from(new Set(values));
      const places = uniqValues
        .sort((a:number, b:number) => (b - a) * config.sort)
        .map((v, i) => [v, i + 1]);
      const refValuePlace = Object.fromEntries(places);

      list.forEach((user: any) => {
        const userValue = user[config.property];
        const userFormattedValue = Array.isArray(userValue)
          ? userValue?.length
          : userValue;
        this.statisticByName[user.author][config.property] = refValuePlace[userFormattedValue];
      });

      this.total[config.property] = uniqValues.length;
    });
  }
}
