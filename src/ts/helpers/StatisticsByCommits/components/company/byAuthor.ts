import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

import { getDaysBetween } from '../../helpers';

export interface CompanyAuthorCommit {
  author: string;
  firstCommit: number;
  lastCommit: number;
  days: Set<string>;
  tasks: Set<string>;
  taskCodes: Set<string>;
}

export interface CompanyAuthor {
  author: string;
  totalDaysWorked: number;
  totalDaysInProject: number;
  totalTasks: number;
  taskCodes: string[];
  firstCommit: number;
  lastCommit: number;
}

export default class StatisticsByAuthors {
  commits: HashMap<CompanyAuthorCommit> = new Map();

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

  #updateCommit(statistic: CompanyAuthorCommit, commit: ICommit) {
    statistic.lastCommit = commit.milliseconds;
    statistic.days.add(commit.timestamp);
    if (commit.task) statistic.tasks.add(commit.task);
    if (commit.taskCode) statistic.taskCodes.add(commit.taskCode);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.author, {
      author: commit.author,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.task ? [commit.task] : []),
      taskCodes: new Set(commit.taskCode ? [commit.taskCode] : []),
    });
  }

  getTotalInfo() {
    return Array.from(this.commits.values())
      .map((item: CompanyAuthorCommit): CompanyAuthor => ({
        author: item.author,
        totalDaysWorked: item.days.size,
        totalDaysInProject: getDaysBetween(item.firstCommit, item.lastCommit),
        totalTasks: item.tasks.size,
        taskCodes: Array.from(item.taskCodes),
        firstCommit: item.firstCommit,
        lastCommit: item.lastCommit,
      }))
      .sort((itemA: CompanyAuthor, itemB: CompanyAuthor) => (itemB.totalTasks - itemA.totalTasks));
  }
}
