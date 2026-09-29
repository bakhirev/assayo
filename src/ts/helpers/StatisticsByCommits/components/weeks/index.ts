import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import applicationConfig from 'ts/store/ApplicationConfig';

import type { StatisticsCommonTotal } from './common';
import StatisticsByWeekCommon from './common';

export interface StatisticsWeekCommit {
  week: string;
  common: StatisticsByWeekCommon,
  authors: HashMap<StatisticsByWeekCommon>,
}

export interface StatisticsWeekTotal extends StatisticsCommonTotal {
  week: string;
  weekIndex: number;
  authors: IHashMap<StatisticsCommonTotal>;
  totalAuthors: number;
  tasksByAuthor: IHashMap<number>;
}

export default class StatisticsByWeek {
  commits: HashMap<StatisticsWeekCommit> = new Map();

  totalInfo: StatisticsWeekTotal[] = [];

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
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: StatisticsWeekCommit, commit: ICommit) {
    statistic.common.update(commit);
    if (!commit.author) return;
    const byAuthor = statistic.authors.get(commit.author);
    if (byAuthor) {
      byAuthor.update(commit);
    } else {
      statistic.authors.set(commit.author, new StatisticsByWeekCommon(commit));
    }
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.week, {
      week: commit.week,
      common: new StatisticsByWeekCommon(commit),
      authors: commit.author ? new Map([[commit.author, new StatisticsByWeekCommon(commit)]]) : new Map(),
    });
  }

  updateTotalInfo() {
    const workDaysNumber = applicationConfig.config?.workDays?.filter?.((v) => v)?.length || 5;
    this.totalInfo = Array.from(this.commits.values())
      .map((statistic: StatisticsWeekCommit, weekIndex: number) => {
        const common = statistic.common.getTotalInfo(workDaysNumber);

        const tasksByAuthor: IHashMap<number> = {};
        let totalDaysWithoutCommits: number = 0;
        const authorsArray = Array.from(statistic.authors).map(([key, value]: any) => {
          const totalInfo = value.getTotalInfo(workDaysNumber);
          tasksByAuthor[key] = totalInfo.totalTasks;
          totalDaysWithoutCommits += totalInfo.totalDaysWithoutCommits;
          return [key, totalInfo]
        });

        return {
          week: statistic.week,
          weekIndex,
          ...common,
          authors: Object.fromEntries(authorsArray),
          tasksByAuthor,
          totalDaysWithoutCommits,
          totalAuthors: authorsArray.length,
        };
      }).reverse();
  }
}
