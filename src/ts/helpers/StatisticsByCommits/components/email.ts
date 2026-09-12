import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

export interface Email {
  author: string;
  email: string;
  company: string;
  from: number;
  to: number;
  type: number;
}

export default class StatisticsByEmail {
  commits: HashMap<Email> = new Map();

  totalInfo: Email[] = [];

  totalInfoByName: HashMap<Email> = new Map();

  constructor() {
    this.clear();
  }

  clear() {
    this.commits.clear();
    this.totalInfo = [];
    this.totalInfoByName.clear();
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.email);
    if (statistic) {
      this.#updateCommitByEmail(statistic, commit);
    } else {
      this.#addCommitByEmail(commit);
    }
  }

  #updateCommitByEmail(statistic: Email, commit: ICommit) {
    statistic.to = commit.milliseconds;
  }

  #addCommitByEmail(commit: ICommit) {
    this.commits.set(commit.email, {
      author: commit.author,
      email: commit.email,
      from: commit.milliseconds,
      to: commit.milliseconds,
      company: commit.company,
      type: commit.emailType,
    });
  }

  updateTotalInfo(statisticsByAuthor: { list: string[] }) {
    const indexByAuthor = Object.fromEntries(
      statisticsByAuthor.list.map((name: string, index: number) => ([name, index])),
    );
    this.totalInfo = Array.from(this.commits.values())
      .sort((a: Email, b: Email) => {
        const order = indexByAuthor[a.author] - indexByAuthor[b.author];
        if (order) return order;
        return a.type - b.type;
      });
    this.totalInfoByName = this.commits;
    this.commits = new Map();
  }
}
