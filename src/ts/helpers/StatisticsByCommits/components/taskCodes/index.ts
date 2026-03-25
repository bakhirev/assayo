import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';
import { WeightedAverage } from 'ts/helpers/Math';

import StatisticsByAuthors from './byAuthors';
import StatisticsByNumbers from './byNumbers';
import { createUniqValues, getDaysBetween, incrementUniqValues } from '../../helpers';

export default class StatisticsByTaskCodes {
  commits: HashMap<any> = new Map();

  totalInfo: any = [];

  totalInfoByName: HashMap<any> = new Map();

  clear() {
    this.commits.clear();
    this.totalInfo = [];
    this.totalInfoByName.clear();
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommitByTaskCode(statistic, commit);
    } else {
      this.#addCommitByTaskCode(commit);
    }
  }

  #updateCommitByTaskCode(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.lastCommit = commit.milliseconds;
    incrementUniqValues(statistic.days, commit.timestamp);
    incrementUniqValues(statistic.tasks, commit.taskNumber);
    statistic.authors.addCommit(commit);
    statistic.months.addCommit(commit);
    statistic.linesInTask.update(commit.added + commit.changes + commit.removed);
  }

  #addCommitByTaskCode(commit: ICommit) {
    const linesInTask = new WeightedAverage();
    linesInTask.update(commit.added + commit.changes + commit.removed);
    this.commits.set(commit.taskCode, {
      commits: 1,
      taskCode: commit.taskCode,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      days: createUniqValues(commit.timestamp),
      tasks: createUniqValues(commit.taskNumber),
      authors: new StatisticsByAuthors(commit),
      months: new StatisticsByNumbers(commit),
      linesInTask,
    });
  }

  updateTotalInfo(statisticsByAuthor: any, lastCommit: ICommit) {
    const dismissedLimit = lastCommit?.milliseconds - 60 * ONE_DAY;
    this.totalInfo = Array.from(this.commits.values())
      .filter((item: any) => item.commits > 3)
      .map((item: any) => {
        const authors = item.authors.getTotalInfo(statisticsByAuthor);
        const months = item.months.getTotalInfo(statisticsByAuthor, item.tasks);
        const data = {
          taskCode: item.taskCode,
          tasks: item.tasks.size,
          from: item.firstCommit,
          to: item.lastCommit,
          authors,
          months,
          totalDays: getDaysBetween(item.firstCommit, item.lastCommit),
          totalDaysWorked: item.days.size,
          totalAuthors: authors.length,
          isActive: item.lastCommit > dismissedLimit,
          linesInTask: Math.round(item.linesInTask.get()),
        };
        this.totalInfoByName.set(item.taskCode, data);
        return data;
      })
      .sort((dotA: any, dotB: any) => dotB.totalDays - dotA.totalDays);

    this.commits.clear();
  }
}
