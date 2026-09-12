import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { createIncrement, increment } from 'ts/helpers/Math';

export interface StatisticsTypeCommit {
  type: string;
  commits: number;
  days: Map<string, boolean>;
  tasks: Map<string, boolean>;
  commitsByAuthors: IHashMap<number>;
  daysByAuthors: IHashMap<IHashMap<number>>;
}

export interface StatisticsType {
  type: string;
  commits: number;
  days: number;
  tasks: number;
  commitsByAuthors: IHashMap<number>;
  daysByAuthors: IHashMap<IHashMap<number>>;
  daysByAuthorsTotal: number;
}

export default class StatisticsByType {
  list: string[] = [];

  commits: IHashMap<StatisticsTypeCommit> = {};

  totalInfo: StatisticsType[] = [];

  clear() {
    this.list = [];
    this.commits = {};
    this.totalInfo = [];
  }

  addCommit(commit: ICommit) {
    if (this.commits.hasOwnProperty(commit.type)) {
      this.#updateCommitByType(commit);
    } else {
      this.#addCommitByType(commit);
    }
  }

  #updateCommitByType(commit: ICommit) {
    const statistic = this.commits[commit.type];
    statistic.commits += 1;
    statistic.days.set(commit.timestamp, true);
    statistic.tasks.set(commit.task, true);

    increment(statistic.commitsByAuthors, commit.author);
    if (!statistic.daysByAuthors[commit.author]) statistic.daysByAuthors[commit.author] = {};
    increment(statistic.daysByAuthors[commit.author], commit.timestamp);
  }

  #addCommitByType(commit: ICommit) {
    this.commits[commit.type] = {
      type: commit.type,
      commits: 1,
      days: new Map([[commit.timestamp, true]]),
      tasks: new Map([[commit.task, true]]),
      commitsByAuthors: createIncrement(commit.author, true),
      daysByAuthors: {
        [commit.author]: createIncrement(commit.timestamp, true),
      },
    };
  }

  updateTotalInfo() {
    this.totalInfo = Object.values(this.commits)
      .filter((dot: StatisticsTypeCommit) => dot?.type)
      .map((dot: StatisticsTypeCommit): StatisticsType => ({
        ...dot,
        tasks: dot.tasks.size,
        days: dot.days.size,
        daysByAuthorsTotal: Object.values(dot.daysByAuthors)
          .reduce((t: number, v: IHashMap<number>) => (t + Object.keys(v).length), 0),
      }))
      .sort((dotA: StatisticsType, dotB: StatisticsType) => dotB.days - dotA.days);

    this.list = this.totalInfo.map((dot: StatisticsType) => dot.type);
  }
}
