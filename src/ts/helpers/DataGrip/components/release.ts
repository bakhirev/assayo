import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import settingsStore from 'ts/store/Settings';

function getRangeInDay(fromObject: any, toObject: any, gap?: number) {
  const to = toObject.milliseconds;
  const from = fromObject.milliseconds;
  const delay = ((to - from) / settingsStore.ONE_DAY) - (gap || 0);
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
        this.#updateRelease(commit);
      } else {
        this.#addRelease(commit);
      }
    } else if (commit.commitType === COMMIT_TYPE.PR_GITHUB || commit.commitType === COMMIT_TYPE.PR_BITBUCKET) {
      this.lastPrList.push(commit);
    }
  }

  #updateRelease(commit: ISystemCommit) {
    const statistic = this.release[commit.branch];
    statistic.lastCommit = commit;
    statistic.to = commit.timestamp;
    statistic.delayInDays = getRangeInDay(statistic.firstCommit, commit) || statistic.delayInDays;
  }

  #addRelease(commit: ISystemCommit) {
    if (!commit.branch) return;

    const index = commit.branch.lastIndexOf('release');
    if (index === -1) return;

    const title = commit.branch
      .substring(index + 7)
      .replace(/([^\w.]*)/, '')
      .trim();

    this.release[commit.branch] = {
      title,
      firstCommit: commit,
      lastCommit: commit,
      from: commit.timestamp,
      to: null,
      delayInDays: 0,
      waitingInDays: 0,
      pr: this.lastPrList,
      prLength: this.lastPrList.length,
    };

    this.lastPrList = [];
  }

  updateTotalInfo() {
    let prev: any = null;

    this.lastPrList = [];

    this.statistic = Object.entries(this.release)
      .sort((a: any, b: any) => a[1].firstCommit.milliseconds - b[1].firstCommit.milliseconds)
      .map((a: any) => {
        const item = a[1];

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
