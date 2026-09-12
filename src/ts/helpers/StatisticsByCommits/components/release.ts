import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import { getDaysFromTo } from 'ts/helpers/Math';
import StatisticsByTasks from './tasks';
import StatisticsByPR from './pr';

export interface StatisticsReleaseDate {
  month: number;
  dayInMonth: number;
  year: number;
  timestamp?: string;
}

export interface StatisticsRelease {
  title: string;
  dateMerge: number;
  dateCreate: number;
  from: StatisticsReleaseDate;
  to: StatisticsReleaseDate;
  delayInDays: number;
  daysAwaitNextRelease: number;
  prIds: number[];
  totalPR: number;
}

export default class StatisticsByRelease {
  release: IHashMap<StatisticsRelease> = {};

  totalInfo: StatisticsRelease[] = [];

  lastPrList: number[] = [];

  totalInfoByName: IHashMap<StatisticsRelease> = {};

  clear() {
    this.release = {};
    this.totalInfo = [];
    this.lastPrList = [];
  }

  addCommit(commit: ISystemCommit) {
    if (commit.commitType === COMMIT_TYPE.AUTO_MERGE) {
      if (this.release[commit.branch]) {
        this.#updateDateInRelease(commit.branch, commit);
      } else {
        this.#addReleaseForBB(commit);
      }
    } else if (commit.commitType === COMMIT_TYPE.PR_GITHUB) {
      if (!this.release[commit.toBranch]) this.#addRelease(commit.toBranch, commit);
      if (!this.release[commit.toBranch]) return;
      this.#updateDateInRelease(commit.toBranch, commit);
      this.#updatePRInRelease(commit.toBranch, commit);
    } else if (commit.commitType === COMMIT_TYPE.PR_BITBUCKET) {
      this.lastPrList.push(commit.prId);
    }
  }

  #updateDateInRelease(branch: string, commit: ISystemCommit) {
    const statistic = this.release[branch];
    statistic.dateMerge = commit.milliseconds;
    statistic.to.month = commit.month;
    statistic.to.dayInMonth = commit.dayInMonth;
    statistic.to.year = commit.year;
    statistic.to.timestamp = commit.timestamp;
    const delayInDays = getDaysFromTo(statistic.dateCreate, statistic.dateMerge);
    statistic.delayInDays = (delayInDays > 1 ? (delayInDays - 1) : 0) || statistic.delayInDays;
  }

  #updatePRInRelease(branch: string, commit: ISystemCommit) {
    const statistic = this.release[branch];
    statistic.prIds.push(commit.prId);
  }

  #addReleaseForBB(commit: ISystemCommit) {
    if (!commit.branch) return;

    const status = this.#addRelease(commit.branch, commit);
    if (!status) return;

    this.release[commit.branch].prIds = this.lastPrList;
    this.lastPrList = [];
  }

  #addRelease(branch: string, commit: ISystemCommit) {
    const index = (branch || '').lastIndexOf('release');
    if (index === -1) return false;

    const title = branch
      .substring(index + 7)
      .replace(/([^\w.]*)|(["']*)/gim, '')
      .trim()
      .replace(/([0-9])([a-z])|([a-z])([0-9])/gim, '$1$3-$2$4');

    this.release[branch] = {
      title,
      dateMerge: commit.milliseconds,
      dateCreate: commit.milliseconds,
      from: {
        month: commit.month,
        dayInMonth: commit.dayInMonth,
        year: commit.year,
      },
      to: {
        month: commit.month,
        dayInMonth: commit.dayInMonth,
        year: commit.year,
        timestamp: commit.timestamp,
      },
      delayInDays: 0,
      daysAwaitNextRelease: 0,
      prIds: [],
      totalPR: 0,
    };

    return true;
  }

  updateTotalInfo(statisticsByTasks: StatisticsByTasks, statisticsByPR: StatisticsByPR) {
    let prev: StatisticsRelease | null = null;

    this.lastPrList = [];

    this.totalInfo = Object.entries(this.release)
      .sort((a, b) => a[1].dateCreate - b[1].dateCreate)
      .map(([branch, item]) => {
        item.prIds.forEach((prId: number) => {
          const pr = statisticsByPR.totalInfoByName.get(prId);
          if (!pr) return;
          pr.daysAwaitRelease = getDaysFromTo(pr.dateMerge, item.dateMerge);
          const task = statisticsByTasks.totalInfoByName.get(pr.task);
          if (!task) return;
          (task.releaseIds as Set<string>).add(branch);
        });
        item.totalPR = item.prIds.length;

        if (prev) {
          prev.daysAwaitNextRelease = getDaysFromTo(prev.dateMerge, item.dateCreate);
        }

        prev = item;
        return item;
      })
      .reverse();
  }
}
