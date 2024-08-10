import { makeObservable, observable, action } from 'mobx';
import { ONE_DAY } from 'ts/helpers/formatter';

import ICommit from '../interfaces/Commit';

interface IFiltersInHeaderStore {
  defaultFrom: string;
  defaultTo: string;
  from: string;
  to: string;

  updateByCommits: (firstCommit: ICommit, lastCommit: ICommit) => void,
  setFilterByDateType: (type: string) => void,
}

class FiltersInHeaderStore implements IFiltersInHeaderStore {
  defaultFrom: string = ''; // "2021-02-09"

  defaultTo: string = ''; // "2021-02-09"

  from: string = ''; // "2021-02-09"

  to: string = ''; // "2021-02-09"

  lastCommitTime: number = 0; // 1612828800000

  constructor() {
    makeObservable(this, {
      defaultFrom: observable,
      defaultTo: observable,
      from: observable,
      to: observable,

      updateByCommits: action,
      setFilterByDateType: action,
      updateProperty: action,
    });
  }

  updateByCommits(firstCommit: ICommit, lastCommit: ICommit) {
    this.defaultFrom = firstCommit.timestamp;
    this.defaultTo = lastCommit.timestamp;
    this.from = this.defaultFrom;
    this.to = this.defaultTo;
    this.lastCommitTime = (new Date(this.defaultTo)).getTime();
  }

  setFilterByDateType(type: string) {
    const count = {
      year: 365,
      halfYear: 183,
      month: 30,
      week: 7,
      day: 1,
    }[type];

    this.from = count
      ? (new Date(this.lastCommitTime - ONE_DAY * count)).toISOString().split('T')[0]
      : this.defaultFrom;

    this.to = this.defaultTo;
  }

  updateProperty(propertyName: string, value?: any) {
    this[propertyName] = value ?? null;
  }
}

const filtersInHeaderStore = new FiltersInHeaderStore();

export default filtersInHeaderStore;
