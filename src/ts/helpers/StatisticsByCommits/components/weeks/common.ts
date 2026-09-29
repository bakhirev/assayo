import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

export interface StatisticsCommon {
  commits: number;

  tasks: Set<string>;
  timestamp: Set<string>;
  types: HashMap<number>;

  added: number;
  changes: number;
  removed: number;
}

export interface StatisticsCommonTotal {
  commits: number;
  totalTasks: number;
  totalDays: number;
  totalDaysWithoutCommits: number;
  types: IHashMap<number>;

  added: number;
  changes: number;
  removed: number;
  totalChanges: number;
}

export default class StatisticsByWeekCommon {
  statistic: StatisticsCommon;

  constructor(commit: ICommit) {
    this.statistic = {
      commits: 1,

      tasks: commit.task ? new Set([commit.task]) : new Set(),
      timestamp: commit.timestamp ? new Set([commit.timestamp]) : new Set(),
      types: commit.type ? new Map([[commit.type, 1]]) : new Map(),

      added: commit.added || 0,
      changes: commit.changes || 0,
      removed: commit.removed || 0,
    };
  }

  update(commit: ICommit) {
    const statistic = this.statistic;
    statistic.commits += 1;

    if (commit.task) statistic.tasks.add(commit.task);
    if (commit.timestamp) statistic.timestamp.add(commit.timestamp);
    if (commit.type) {
      statistic.types.set(commit.type, (statistic.types.get(commit.type) || 0) + 1);
    }

    statistic.added += commit.added;
    statistic.changes += commit.changes;
    statistic.removed += commit.removed;
  }

  getTotalInfo(workDaysNumber: number): StatisticsCommonTotal {
    const statistic = this.statistic;
    const totalDays = statistic.timestamp.size;
    const totalDaysWithoutCommits = workDaysNumber - totalDays;

    return {
      commits: statistic.commits,
      totalTasks: statistic.tasks.size,
      totalDays: totalDays,
      totalDaysWithoutCommits: totalDaysWithoutCommits < 0 ? 0 : totalDaysWithoutCommits,
      types: Object.fromEntries(statistic.types),
      added: statistic.added,
      changes: statistic.changes,
      removed: statistic.removed,
      totalChanges: statistic.added + statistic.changes + statistic.removed,
    }
  }
}
