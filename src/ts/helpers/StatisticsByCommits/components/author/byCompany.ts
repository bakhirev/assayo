import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

export default class StatisticsByCompany {
  commits: HashMap<any> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.company) return;
    const statistic = this.commits.get(commit.company);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.to = commit.milliseconds;
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.company, {
      title: commit.company,
      from: commit.milliseconds,
      to: commit.milliseconds,
    });
  }

  getTotalInfo() {
    const data = Array.from(this.commits.values());
    this.commits.clear();
    return data;
  }
}
