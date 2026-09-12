import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import applicationConfig from 'ts/store/ApplicationConfig';
import {
  getDaysBetween,
  createMap,
  incrementMap,
} from '../../helpers';

import StatisticsByAuthors, { ScopeAuthorsTotal } from './byAuthor';

export type { ScopeAuthorCommit, ScopeAuthorsTotal } from './byAuthor';

export interface StatisticsScopeCommit {
  scope: string;
  commits: number;
  firstCommit: number;
  lastCommit: number;
  days: Set<string>;
  tasks: Set<string>;
  types: Map<string, number>;
  companies: Map<string, number>;
  authors: StatisticsByAuthors;
}

export interface StatisticsScope {
  scope: string;
  commits: number;
  firstCommit: number;
  lastCommit: number;
  totalDaysWorked: number;
  totalDaysWorkedByAuthor: number;
  totalDays: number;
  totalTasks: number;
  totalAuthors: number;
  tasks: string[];
  types: IHashMap<number>;
  companies: IHashMap<number>;
  commitsByAuthor: IHashMap<number>;
  tasksByAuthor: IHashMap<number>;
  cost: number;
}

export default class StatisticsByScope {
  list: string[] = [];

  commits: HashMap<StatisticsScopeCommit> = new Map();

  totalInfo: StatisticsScope[] = [];

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

  #updateCommit(statistic: StatisticsScopeCommit, commit: ICommit) {
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
      .filter((dot: StatisticsScopeCommit) => dot.commits > 5)
      .map((item: StatisticsScopeCommit) => {
        const {
          totalDays: totalDaysWorkedByAuthor,
          totalAuthors,
          commitsByAuthor,
          tasksByAuthor,
        }: ScopeAuthorsTotal = item.authors.getTotalInfo();

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
      .sort((dotA: StatisticsScope, dotB: StatisticsScope) => dotB.commits - dotA.commits);

    this.list = this.totalInfo.map((dot: StatisticsScope) => dot.scope);

    this.commits.clear();
  }
}
