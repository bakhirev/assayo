import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

import {
  getDaysBetween,
  createUniqValues,
  incrementUniqValues,
} from '../../helpers';

export default class StatisticsByAuthors {
  commits: HashMap<any> = new Map();

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

  #updateCommit(statistic: any, commit: ICommit) {
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

  getTotalInfo(statisticsByAuthor: any) {
    const order = statisticsByAuthor.list;
    return Array.from(this.commits.values())
      .map((item: any) => ({
        author: item.author,
        totalDays: item.days.size,
        totalDaysInProject: getDaysBetween(item.firstCommit, item.lastCommit),
        totalTasks: item.tasks.size,
        firstCommit: item.firstCommit,
        lastCommit: item.lastCommit,
      }))
      .sort((itemA: any, itemB: any) => (
        order.indexOf(itemA.author) - order.indexOf(itemB.author)
      ));
  }
}
