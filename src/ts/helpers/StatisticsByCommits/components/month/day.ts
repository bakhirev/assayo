import { HashMap } from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';

import { createMap, incrementMap } from '../../helpers';

export interface StatisticsDay {
  timestamp: string;
  dayInMonth: number;
  commitsNumber: number;
  commitsNumberByType: HashMap<number>;
  commitsNumberByAuthor: HashMap<number>;
}

export default class StatisticsByDay {
  commits: HashMap<StatisticsDay> = new Map();

  maxCommitsInDay: number = 0;

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.dayInMonth);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commitsNumber += 1;
    incrementMap(statistic.commitsNumberByType, commit.type);
    incrementMap(statistic.commitsNumberByAuthor, commit.author);
    if (statistic.commitsNumber > this.maxCommitsInDay) {
      this.maxCommitsInDay = statistic.commitsNumber;
    }
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.dayInMonth, {
      commitsNumber: 1,
      dayInMonth: commit.dayInMonth,
      timestamp: commit.timestamp,
      commitsNumberByType: createMap(commit.type),
      commitsNumberByAuthor: createMap(commit.author),
    });
  }

  getTotalInfo() {
    return Array.from(this.commits.values());
  }
}
