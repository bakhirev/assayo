import { ISystemCommit } from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { getDaysFromTo } from 'ts/helpers/Math';

import { getClearTaskMessage } from '../helpers/getClearTaskMessage';

function getIndexAfterMerge(milliseconds: number[], dateMerge: number) {
  return milliseconds.findIndex((millisecond: number) => millisecond > dateMerge);
}

function getCommitDateBeforePR(milliseconds: number[], dateMerge: number) {
  const next = getIndexAfterMerge(milliseconds, dateMerge);
  return milliseconds[next - 1] || dateMerge;
}

function getCommitDateAfterPR(milliseconds: number[], dateMerge: number) {
  const next = getIndexAfterMerge(milliseconds, dateMerge);
  return milliseconds[next] || dateMerge;
}

export default class StatisticsByPR {
  uniqIndex: number = 1;

  totalInfo: any[] = [];

  totalInfoByName: HashMap<any> = new Map();

  clear() {
    this.uniqIndex = 1;
    this.totalInfo = [];
    this.totalInfoByName.clear();
  }

  addCommit(commit: ISystemCommit) {
    if (!commit.prId) return;
    const message = getClearTaskMessage(commit.message, commit.task, [commit.type], [commit.scope]);
    this.totalInfo.push({
      // уникальный ID
      prId: commit.prId,
      prExternalId : commit.prExternalId,
      branch: commit.branch,
      description: message || commit.branch,
      dateMerge: commit.milliseconds,
      dateMergeFull: commit.date,
      dateCreate: commit.milliseconds,
      dateMergeYear: commit.year,
      daysInReview: 1,
      daysWorkOnTask: 1,

      // для фильтров поиска
      author: commit.author,
      task: commit.task,
      taskCode: commit.taskCode,
      company: commit.company,
      types: [],
      scope: [],
    });
  }

  updateTotalInfo(statisticsByTasks: any) {
    this.totalInfo.forEach((item: any) => {
      this.totalInfoByName.set(item.prId, item);

      const task = statisticsByTasks.totalInfoByName.get(item.task);
      if (!task) return;

      item.dateCreate = task.lastCommit < item.dateMerge
        ? task.lastCommit
        : getCommitDateBeforePR(task.milliseconds, item.dateMerge);
      item.daysInReview = getDaysFromTo(item.dateCreate, item.dateMerge, 1);
      task.prIds.push(item.prId);
      item.types = task.types; // передача по ссылке, будь осторожен
      item.scope = task.scope;

      const prevPrId = task.prIds[task.prIds.length - 2];
      if (prevPrId) {
        const prevPr = this.totalInfoByName.get(prevPrId);
        const firstWorkDay = getCommitDateAfterPR(task.milliseconds, prevPr.dateMerge);
        item.daysWorkOnTask = getDaysFromTo(firstWorkDay, item.dateCreate);
      } else {
        item.daysWorkOnTask = getDaysFromTo(task.firstCommit, item.dateCreate);
      }
    });

    this.totalInfo.sort((itemA: any, itemB: any) => itemB.dateMerge - itemA.dateMerge);
  }
}
