import { COMMIT_TYPE, ISystemCommit } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

export default class DataGripByPr {
  list: string[] = [];

  pr: IHashMap<any> = {};

  statistic: any = [];

  clear() {
    this.list = [];
    this.pr = {};
    this.statistic = [];
  }

  addCommit(commit: ISystemCommit) {
    if (commit.commitType === COMMIT_TYPE.AUTO_MERGE) return;
    if (this.pr[commit.prId]) {
      this.#updateCommitByPR(commit);
    } else {
      this.#addCommitByPR(commit);
    }
  }

  #updateCommitByPR(commit: ISystemCommit) {
    const statistic = this.pr[commit.prId];
    const property = commit.commitType === COMMIT_TYPE.MERGE ? 'close' : 'open';
    statistic[property] = commit;
    statistic.delay = statistic.open.milliseconds - statistic.close.milliseconds;
  }

  #addCommitByPR(commit: ISystemCommit) {
    const property = commit.commitType === COMMIT_TYPE.MERGE ? 'close' : 'open';
    this.pr[commit.prId] = { [property]: commit };
  }

  updateTotalInfo() {
    this.statistic = [];
  }
}