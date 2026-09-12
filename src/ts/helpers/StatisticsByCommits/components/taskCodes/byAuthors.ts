import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

import {
  getDaysBetween,
  createUniqValues,
  incrementUniqValues,
} from '../../helpers';
import StatisticsByAuthor from '../author';

export interface TaskCodeAuthorCommit {
  author: string;
  days: Set<string | number>;
  tasks: Set<string | number>;
  firstCommit: number;
  lastCommit: number;
}

export interface TaskCodeAuthor {
  author: string;
  totalDays: number;
  totalDaysInProject: number;
  totalTasks: number;
  firstCommit: number;
  lastCommit: number;
}

export default class StatisticsByAuthors {
  commits: HashMap<TaskCodeAuthorCommit> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.author) return;
    const statistic = this.commits.get(commit.author);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: TaskCodeAuthorCommit, commit: ICommit) {
    incrementUniqValues(statistic.days, commit.timestamp);
    incrementUniqValues(statistic.tasks, commit.taskNumber);
    statistic.lastCommit = commit.milliseconds;
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.author, {
      author: commit.author,
      days: createUniqValues(commit.timestamp),
      tasks: createUniqValues(commit.taskNumber),
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
    });
  }

  getTotalInfo(statisticsByAuthor: StatisticsByAuthor) {
    const order = statisticsByAuthor.list;
    return Array.from(this.commits.values())
      .map((item: TaskCodeAuthorCommit): TaskCodeAuthor => ({
        author: item.author,
        totalDays: item.days.size,
        totalDaysInProject: getDaysBetween(item.firstCommit, item.lastCommit),
        totalTasks: item.tasks.size,
        firstCommit: item.firstCommit,
        lastCommit: item.lastCommit,
      }))
      .sort((itemA: TaskCodeAuthor, itemB: TaskCodeAuthor) => (
        order.indexOf(itemA.author) - order.indexOf(itemB.author)
      ));
  }
}
