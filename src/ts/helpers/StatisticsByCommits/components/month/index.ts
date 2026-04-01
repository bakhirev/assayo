import { HashMap } from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';

import StatisticsByDay, { StatisticsDay } from './day';
import { createUniqValues, incrementUniqValues } from '../../helpers';

export interface StatisticsMonth {
  id: string;
  month: number;
  year: number;
  date: Date;
  milliseconds: number;

  days: StatisticsDay[];
  authors: Set<string>;
  totalTasksNumber: number;
  totalUsersNumber: number;
}

export default class StatisticsByMonth {
  commits: HashMap<any> = new Map();

  totalInfo: StatisticsMonth[] = [];

  maxCommitsInDay: number = 0;

  clear() {
    this.commits.clear();
    this.totalInfo = [];
    this.maxCommitsInDay = 0;
  }

  #getKey(commit: ICommit) {
    return `${commit.year}-${commit.month}`;
  }

  addCommit(commit: ICommit) {
    const key = this.#getKey(commit);
    const statistic = this.commits.get(key);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit, key);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    incrementUniqValues(statistic.usersNumber, commit.author);
    incrementUniqValues(statistic.tasksNumber, commit.task);
    statistic.days.addCommit(commit);
    if (statistic.days.maxCommitsInDay > this.maxCommitsInDay) {
      this.maxCommitsInDay = statistic.days.maxCommitsInDay;
    }
  }

  #addNewCommit(commit: ICommit, key: string) {
    this.commits.set(key, {
      id: key,
      month: commit.month,
      year: commit.year,
      milliseconds: commit.milliseconds,
      date: new Date(commit.milliseconds),
      days: new StatisticsByDay(commit),
      tasksNumber: createUniqValues(commit.task),
      usersNumber: createUniqValues(commit.author),
    });
  }

  updateTotalInfo(statisticsByAuthor: any) {
    this.totalInfo = Array.from(this.commits.values())
      .map((item: any) => {
        const days = item.days.getTotalInfo();
        const totalTasksNumber = item.tasksNumber.size;
        const totalUsersNumber = Array
          .from(item.usersNumber) // @ts-ignore
          .filter((name) => !statisticsByAuthor.totalInfoByName[name]?.isStaff)
          .length;

        return {
          id: item.id,
          month: item.month,
          year: item.year,
          milliseconds: item.milliseconds,
          date: new Date(item.milliseconds),
          days,
          authors: item.usersNumber,
          totalTasksNumber,
          totalUsersNumber,
        };
      })
      .sort((a: StatisticsMonth, b: StatisticsMonth) => a.milliseconds - b.milliseconds);

    this.commits.clear();
  }
}
