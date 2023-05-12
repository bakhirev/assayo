import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import settingsStore from 'ts/store/Settings';

export default class DataGripByScope {
  list: string[] = [];

  commits: IHashMap<any> = {};

  statistic: any = [];

  clear() {
    this.list = [];
    this.commits = {};
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    if (this.commits[commit.scope]) {
      this.#updateCommitByScope(commit);
    } else {
      this.#addCommitByScope(commit);
    }
  }

  #updateCommitByScope(commit: ICommit) {
    const statistic = this.commits[commit.scope];
    statistic.commits += 1;
    statistic.days[commit.timestamp] = true;
    statistic.tasks[commit.task] = true;
    statistic.types[commit.type] = statistic.types[commit.type] ? (statistic.types[commit.type] + 1) : 1;
    const author = statistic.authors[commit.author];
    if (author) {
      author.commits += 1;
      author.days[commit.timestamp] = true;
      author.types[commit.type] = author.types[commit.type] ? (author.types[commit.type] + 1) : 1;
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

  #getDefaultAuthorForScope(commit: ICommit) {
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
          salaryCache[name] = salaryCache[name] || settingsStore.getMiddleSalaryInDay(name);
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
