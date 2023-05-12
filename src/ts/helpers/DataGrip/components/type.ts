import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

export default class DataGripByType {
  list: string[] = [];
  
  commits: IHashMap<any> = {};
  
  statistic: any = [];

  clear() {
    this.list = [];
    this.commits = {};
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    if (this.commits[commit.type]) {
      this.#updateCommitByType(commit);
    } else {
      this.#addCommitByType(commit);
    }
  }

  #updateCommitByType(commit: ICommit) {
    const statistic = this.commits[commit.type];
    statistic.commits += 1;
    statistic.days[commit.timestamp] = true;
    statistic.tasks[commit.task] = true;

    const getIncrement = (v?: number) => v ? (v + 1) : 1;
    const setDefault = (s: any, v: string) => {
      if (!s[v]) s[v] = {};
      return s[v];
    };

    statistic.commitsByAuthors[commit.author] = getIncrement(statistic.commitsByAuthors[commit.author]);
    setDefault(statistic.daysByAuthors, commit.author)[commit.timestamp] = getIncrement(statistic.daysByAuthors[commit.author][commit.timestamp]);
  }

  #addCommitByType(commit: ICommit) {
    this.commits[commit.type] = {
      type: commit.type,
      commits: 1,
      days: { [commit.timestamp]: true },
      tasks: { [commit.task]: true },
      commitsByAuthors: { [commit.author]: 1 },
      daysByAuthors: { [commit.author]: { [commit.timestamp]: true } },
    };
  }

  updateTotalInfo() {
    this.statistic = Object.values(this.commits)
      .filter((dot: any) => dot.commits > 5)
      .map((dot: any) => ({
        ...dot,
        tasks: Object.keys(dot.tasks).length,
        days: Object.keys(dot.days).length,
        daysByAuthorsTotal: Object.values(dot.daysByAuthors)
          .reduce((t: number, v: any) => (t + Object.keys(v).length), 0),
      }))
      .sort((dotA, dotB) => dotB.days - dotA.days);

    this.list = this.statistic.map((dot: any) => dot.type);
  }
}
