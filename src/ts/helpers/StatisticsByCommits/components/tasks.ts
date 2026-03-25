import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

import { getDaysFromTo } from 'ts/helpers/Math';
import { getClearTaskMessages } from '../helpers/getClearTaskMessage';

export default class StatisticsByTasks {
  commits: HashMap<any> = new Map();

  totalInfo: any = [];

  totalInfoByName: HashMap<any> = new Map();

  // achievements
  longTaskByAuthor: IHashMap<number> = {};

  clear() {
    this.commits.clear();
    this.totalInfo = [];
    this.totalInfoByName.clear();
    this.longTaskByAuthor = {};
  }

  addCommit(commit: ICommit) {
    if (!commit.task) return;
    const statistic = this.commits.get(commit.task);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.messages.add(commit.message);
    statistic.authors.add(commit.author);
    statistic.days.add(commit.timestamp);
    if (commit.scope) statistic.scope.add(commit.scope);
    if (commit.type) statistic.types.add(commit.type);
    statistic.milliseconds.add(commit.milliseconds);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.task, {
      task: commit.task,
      taskCode: commit.taskCode,
      taskNumber: commit.taskNumber,
      commits: 1,
      firstAuthor: commit.author,
      messages: new Set([commit.message]),
      authors: new Set([commit.author]),
      days: new Set([commit.timestamp]),
      scope: new Set(commit.scope ? [commit.scope] : []),
      types: new Set(commit.type ? [commit.type] : []),
      milliseconds: new Set([commit.milliseconds]),
    });
  }

  updateTotalInfo() {
    this.totalInfo = Array.from(this.commits.values())
      .map((item: any) => {
        const milliseconds = Array.from(item.milliseconds);
        const firstCommit = milliseconds[0] as number;
        const lastCommit = milliseconds[milliseconds.length - 1] as number;
        const scope = Array.from(item.scope.values()) as string[];
        const types = Array.from(item.types.values()) as string[];
        const data = {
          task: item.task,
          taskCode: item.taskCode,
          taskNumber: item.taskNumber,
          commits: item.commits,
          description: getClearTaskMessages(item.messages, item.task, types, scope),
          firstAuthor: item.firstAuthor,
          authors: item.authors,
          totalAuthors: item.authors.size,
          scope,
          types,
          firstCommit,
          lastCommit,
          totalDays: getDaysFromTo(firstCommit, lastCommit),
          totalDaysWorked: item.days.size,
          totalDaysInBacklog: 1,
          // служебные поля для PR
          milliseconds,
          prIds: [],
          // служебные поля
          releaseIds: new Set(),
          createdBefore: firstCommit,
        };
        this.totalInfoByName.set(item.task, data);
        return data;
      })
      .sort((dotA: any, dotB: any) => dotB.lastCommit - dotA.lastCommit);

    this.commits.clear();
  }

  updateTotalInfo2() {
    this.totalInfo.forEach((task: any) => {
      task.releaseIds = Array.from(task.releaseIds);
    });
  }
}
