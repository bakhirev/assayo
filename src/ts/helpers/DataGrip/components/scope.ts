import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import userSettings from 'ts/store/UserSettings';
import { increment } from 'ts/helpers/Math';

interface IStatByAuthor {
  commits: number; // number of commits by author in this scope
  days: IHashMap<boolean>; // commit timestamp
  types: IHashMap<number>; // commit type by author in this scope (fix, feat)
}

interface IStatByScope {
  scope: string; // scope name
  commits: number; // number of commits in this scope
  days: IHashMap<boolean>; // commit timestamp
  tasks: IHashMap<boolean>; // task name in this scope (JIRA-123)
  types: IHashMap<number>; // commit type in this scope (fix, feat)
  authors: IHashMap<IStatByAuthor>; // stat by author for this scope
}

export default class DataGripByScope {
  list: string[] = []; // scope names

  commits: IHashMap<IStatByScope> = {};

  statistic: IStatByScope[] = [];

  clear() {
    this.list = [];
    this.commits = {};
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    if (this.commits.hasOwnProperty(commit.scope)) {
      this.#updateCommitByScope(commit);
    } else {
      this.#addCommitByScope(commit);
    }
  }

  #updateCommitByScope(commit: ICommit) {
    const statistic = this.commits[commit.scope] as IStatByScope;
    statistic.commits += 1;
    statistic.days[commit.timestamp] = true;
    statistic.tasks[commit.task] = true;
    increment(statistic.types, commit.type);

    const author = statistic.authors[commit.author];
    if (author) {
      author.commits += 1;
      author.days[commit.timestamp] = true;
      increment(author.types, commit.type);
    } else {
      statistic.authors[commit.author] = this.#getDefaultAuthorForScope(commit);
    }
  }

  #addCommitByScope(commit: ICommit) {
    this.commits[commit.scope] = {
      scope: commit.scope,
      commits: 1,
      days: { [commit.timestamp]: true },
      tasks: { [commit.task]: true },
      types: { [commit.type]: 1 },
      authors: { [commit.author]: this.#getDefaultAuthorForScope(commit) },
    };
  }

  #getDefaultAuthorForScope(commit: ICommit): IStatByAuthor {
    return {
      commits: 1,
      days: { [commit.timestamp]: true },
      types: { [commit.type]: 1 },
    };
  }

  updateTotalInfo() {
    const salaryCache = {};
    this.statistic = Object.values(this.commits)
      .filter((dot: any) => dot.commits > 5)
      .sort((dotA: any, dotB: any) => dotB.commits - dotA.commits)
      .map((dot: any) => {
        let cost = 0;
        for (let name in dot.authors) {
          const user = dot.authors[name];
          const days: number = Object.keys(user.days).length;
          // TODO: need middle salary in month;
          salaryCache[name] = salaryCache[name] || userSettings.getCurrentSalaryInDay(name);
          cost += days * salaryCache[name];
          dot.authors[name] = { ...user, days };
        }

        return {
          ...dot,
          days: Object.keys(dot.days).length,
          cost,
          tasks: Object.keys(dot.tasks).filter(t => t),
        };
      });

    this.list = this.statistic.map((dot: any) => dot.scope);
  }
}
