import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import { ONE_DAY } from 'ts/helpers/formatter';

function getRangeInDay(fromObject: any, toObject: any, gap?: number) {
  const to = toObject.milliseconds;
  const from = fromObject.milliseconds;
  const delay = ((to - from) / ONE_DAY) - (gap || 0);
  return to !== from && delay > 0 ? delay : 0;
}

export default class DataGripByRelease {
  release: IHashMap<any> = {};

  statistic: any[] = [];

  lastPrList: any[] = [];

  statisticByName: IHashMap<any> = [];

  clear() {
    this.release = {};
    this.statistic = [];
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
    statistic.lastCommit = commit;
    statistic.to = commit.timestamp;
    statistic.delayInDays = getRangeInDay(statistic.firstCommit, commit) || statistic.delayInDays;
  }

  #updatePRInRelease(branch: string, commit: ISystemCommit) {
    const statistic = this.release[branch];
    statistic.prIds.push(commit);
    statistic.prLength = statistic.prIds.length;
  }

  #addReleaseForBB(commit: ISystemCommit) {
    if (!commit.branch) return;

    const status = this.#addRelease(commit.branch, commit);
    if (!status) return;

    this.release[commit.branch].prIds = this.lastPrList;
    this.release[commit.branch].prLength = this.lastPrList.length;
    this.lastPrList = [];
  }

  #addRelease(branch: string, commit: ISystemCommit) {
    const index = (branch || '').lastIndexOf('release');
    if (index === -1) return false;

    const title = branch
      .substring(index + 7)
      .replace(/([^\w.]*)|(["']*)/gim, '')
      .trim();

    this.release[branch] = {
      title,
      firstCommit: commit,
      lastCommit: commit,
      from: commit.timestamp,
      to: null,
      delayInDays: 0,
      waitingInDays: 0,
      prIds: [],
      prLength: 0,
    };

    return true;
  }

  updateTotalInfo(dataGripByTasks: any, dataGripByPR: any) {
    let prev: any = null;

    this.lastPrList = [];

    this.statistic = Object.entries(this.release)
      .sort((a: any, b: any) => a[1].firstCommit.milliseconds - b[1].firstCommit.milliseconds)
      .map((a: any) => {
        const item = a[1];

        item.prIds.forEach((prId: string) => {
          const pr = dataGripByPR.pr.get(prId);
          if (!pr) return;
          const task = dataGripByTasks.statisticByName.get(pr.task);
          if (!task) return;
          task.releaseIds.add(a[0]);
        });

        item.to = item.from !== item.to && item.to
          ? item.lastCommit.date
          : null;
        item.from = item.firstCommit.date;

        if (prev) {
          prev.waitingInDays = getRangeInDay(prev.lastCommit, item.firstCommit, 1);
        }

        prev = item;
        return item;
      })
      .reverse();
  }
}
