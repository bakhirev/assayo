import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import applicationConfig from 'ts/store/ApplicationConfig';
import {
  getDaysBetween,
  createMap,
  incrementMap,
} from '../../helpers';

import StatisticsByAuthors from './byAuthor';

export default class StatisticsByScope {
  list: string[] = [];

  commits: HashMap<any> = new Map();

  totalInfo: any[] = [];

  clear() {
    this.list = [];
    this.commits.clear();
    this.totalInfo = [];
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.scope);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.lastCommit = commit.milliseconds;
    statistic.days.add(commit.timestamp);
    if (commit.task) statistic.tasks.add(commit.task);
    incrementMap(statistic.types, commit.type);
    incrementMap(statistic.companies, commit.company);
    statistic.authors.addCommit(commit);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.scope, {
      scope: commit.scope,
      commits: 1,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.task ? [commit.task] : []),
      types: createMap(commit.type),
      companies: createMap(commit.company),
      authors: new StatisticsByAuthors(commit),
    });
  }

  updateTotalInfo() {
    const middleSalaryInDay = applicationConfig.getMiddleSalaryInDay();

    this.totalInfo = Array.from(this.commits.values())
      .filter((dot: any) => dot.commits > 5)
      .map((item: any) => {
        const {
          totalDays: totalDaysWorkedByAuthor,
          totalAuthors,
          commitsByAuthor,
          tasksByAuthor,
        } =  item.authors.getTotalInfo();

        return {
          scope: item.scope,
          commits: item.commits,
          firstCommit: item.firstCommit,
          lastCommit: item.lastCommit,
          totalDaysWorked: item.days.size,
          totalDaysWorkedByAuthor,
          totalDays: getDaysBetween(item.firstCommit, item.lastCommit),
          totalTasks: item.tasks.size,
          totalAuthors,
          tasks: Array.from(item.tasks),
          types: Object.fromEntries(item.types.entries()),
          companies: Object.fromEntries(item.companies.entries()),
          commitsByAuthor,
          tasksByAuthor,
          cost: totalDaysWorkedByAuthor * middleSalaryInDay,
        };
      })
      .sort((dotA: any, dotB: any) => dotB.commits - dotA.commits);

    this.list = this.totalInfo.map((dot: any) => dot.scope);

    this.commits.clear();
  }
}
