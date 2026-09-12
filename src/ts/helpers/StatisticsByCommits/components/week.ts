import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { increment } from 'ts/helpers/Math';

import StatisticsByAuthor from './author';

export interface StatisticsWeekChanges {
  added: number;
  changes: number;
  removed: number;
}

export interface StatisticsWeekCommit {
  commits: number;
  timestamp: { from: string; to?: string };
  tasks: Set<string>;
  types: IHashMap<number>;
  changes: StatisticsWeekChanges;
  authors: IHashMap<IHashMap<boolean>>;
  workDays: IHashMap<IHashMap<boolean>>;
  typeByAuthor: IHashMap<IHashMap<number>>;
}

export interface StatisticsWeek {
  commits: number;
  timestamp: { from: string; to?: string };
  tasks: number;
  types: IHashMap<number>;
  changes: StatisticsWeekChanges;
  authors: IHashMap<number>;
  workDays: IHashMap<number>;
  lazyDays: IHashMap<number>;
  weekDays: IHashMap<number>;
  typeByAuthor: IHashMap<IHashMap<number>>;
  workDaysTotal: number;
  lazyDaysTotal: number;
  taskInDay: IHashMap<number>;
  authorsLength: number;
  changesLength: number;
}

function addFlag(refKeyFlags: IHashMap<IHashMap<boolean>>, key: string, flag: string) {
  if (!refKeyFlags[key]) refKeyFlags[key] = {};
  refKeyFlags[key][flag] = true;
}

export default class StatisticsByWeek {
  commits: HashMap<StatisticsWeekCommit> = new Map();

  totalInfo: StatisticsWeek[] = [];

  constructor() {
    this.clear();
  }

  clear() {
    this.commits.clear();
    this.totalInfo = [];
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.week);
    if (statistic) {
      this.#updateCommitByWeek(statistic, commit);
    } else {
      this.#addCommitByWeek(commit);
    }
  }

  #updateCommitByWeek(statistic: StatisticsWeekCommit, commit: ICommit) {
    statistic.commits += 1;
    statistic.timestamp.to = commit.timestamp;
    if (commit.task) statistic.tasks.add(commit.task);

    statistic.changes.added += commit.added;
    statistic.changes.changes += commit.changes;
    statistic.changes.removed += commit.removed;

    addFlag(statistic.authors, commit.author, commit.task);
    addFlag(statistic.workDays, commit.author, String(commit.day));

    if (!statistic.typeByAuthor[commit.author]) statistic.typeByAuthor[commit.author] = {};
    increment(statistic.typeByAuthor[commit.author], commit.type);
    increment(statistic.types, commit.type);
  }

  #addCommitByWeek(commit: ICommit) {
    this.commits.set(commit.week, {
      commits: 1,
      timestamp: { from: commit.timestamp },
      tasks: commit.task ? new Set([commit.task]) : new Set(),

      types: { [commit.type]: 1 },
      changes: { added: commit.added, changes: commit.changes, removed: commit.removed },
      authors: { [commit.author]: { [commit.task]: true } },
      workDays: { [commit.author]: { [commit.day]: true } },
      typeByAuthor: { [commit.author]: { [commit.type]: 1 } },
    });
  }

  updateTotalInfo(statisticsByAuthor: StatisticsByAuthor) {
    this.totalInfo = Array.from(this.commits.values())
      .map((dot: StatisticsWeekCommit) => {
        const authors: IHashMap<number> = {};
        for (let name in dot.authors) authors[name] = Object.keys(dot.authors[name]).filter((v) => v).length;

        const workDays: IHashMap<number> = {};
        const lazyDays: IHashMap<number> = {};
        const weekDays: IHashMap<number> = {};

        let workDaysTotal = 0;
        let lazyDaysTotal = 0;
        let authorsLength = 0;

        for (let name in dot.workDays) {
          if (statisticsByAuthor.totalInfoByName.get(name)?.isStaff) continue;
          authorsLength += 1;
          workDays[name] = Object.keys(dot.workDays[name]).length;
          workDaysTotal += workDays[name];
          const limit = 5;
          const lazyDaysValue = limit - workDays[name];
          const weekDaysValue = workDays[name] - limit;

          lazyDays[name] = lazyDaysValue > 0 ? lazyDaysValue : 0;
          weekDays[name] = weekDaysValue > 0 ? weekDaysValue : 0;
          lazyDaysTotal += lazyDays[name];
        }

        const taskInDay: IHashMap<number> = {};
        for (let name in dot.workDays) taskInDay[name] = (authors[name] && workDays[name])
          ? (authors[name] / workDays[name])
          : 0;

        return {
          ...dot,
          tasks: dot.tasks.size,
          authors,
          workDays,
          lazyDays,
          weekDays,
          workDaysTotal,
          lazyDaysTotal,
          taskInDay,
          authorsLength,
          changesLength: dot.changes.added + dot.changes.changes + dot.changes.removed,
        };
      }).reverse();
  }
}
