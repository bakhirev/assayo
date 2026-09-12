import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

export interface ScopeAuthorCommit {
  author: string;
  commits: number;
  days: Set<string>;
  tasks: Set<string>;
}

export interface ScopeAuthorsTotal {
  totalDays: number;
  totalAuthors: number;
  commitsByAuthor: IHashMap<number>;
  tasksByAuthor: IHashMap<number>;
}

export default class StatisticsByAuthors {
  commits: HashMap<ScopeAuthorCommit> = new Map();

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

  #updateCommit(statistic: ScopeAuthorCommit, commit: ICommit) {
    statistic.commits += 1;
    statistic.days.add(commit.timestamp);
    if (commit.task) statistic.tasks.add(commit.task);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.author, {
      author: commit.author,
      commits: 1,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.task ? [commit.task] : []),
    });
  }

  getTotalInfo(): ScopeAuthorsTotal {
    let totalDays = 0;
    let totalAuthors = 0;
    const refAuthorCommits: IHashMap<number> = {};
    const refAuthorTasks: IHashMap<number> = {};
    Array.from(this.commits.values()).forEach((item: ScopeAuthorCommit) => {
      totalDays += item.days.size;
      totalAuthors += 1;
      refAuthorCommits[item.author] = item.commits;
      refAuthorTasks[item.author] = item.tasks.size;
    });
    return {
      totalDays,
      totalAuthors,
      commitsByAuthor: refAuthorCommits,
      tasksByAuthor: refAuthorTasks,
    };
  }
}
