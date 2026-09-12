import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

import { getDaysFromTo } from 'ts/helpers/Math';
import { getClearTaskMessage } from '../helpers/getClearTaskMessage';

export interface StatisticsTaskCommit {
  task: string;
  taskCode: string;
  taskNumber: number;
  commits: ICommit[];
  firstAuthor: string;
  messages: Set<string>;
  authors: Set<string>;
  days: Set<string>;
  scope: Set<string>;
  types: Set<string>;
  milliseconds: Set<number>;
}

export interface StatisticsTaskCommitInfo {
  milliseconds: number;
  author: string;
  description: string;
}

export interface StatisticsTask {
  task: string;
  taskCode: string;
  taskNumber: number;
  commits: StatisticsTaskCommitInfo[];
  description: string;
  firstAuthor: string;
  authors: Set<string>;
  totalAuthors: number;
  scope: string[];
  types: string[];
  firstCommit: number;
  lastCommit: number;
  totalDays: number;
  totalDaysWorked: number;
  totalDaysInBacklog: number;
  milliseconds: number[];
  prIds: number[];
  releaseIds: Set<string> | string[];
  createdBefore: number;
}

export default class StatisticsByTasks {
  commits: HashMap<StatisticsTaskCommit> = new Map();

  totalInfo: StatisticsTask[] = [];

  totalInfoByName: HashMap<StatisticsTask> = new Map();

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

  #updateCommit(statistic: StatisticsTaskCommit, commit: ICommit) {
    statistic.commits.push(commit);
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
      commits: [commit],
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
      .map((item: StatisticsTaskCommit) => {
        const milliseconds = Array.from(item.milliseconds);
        const firstCommit = milliseconds[0] as number;
        const lastCommit = milliseconds[milliseconds.length - 1] as number;
        const scope = Array.from(item.scope.values()) as string[];
        const types = Array.from(item.types.values()) as string[];
        const taskDescription: string[] = [];
        const commits = item.commits.map((commit: ICommit) => {
          const description = getClearTaskMessage(commit.message, item.task, types, scope);
          taskDescription.push(description);
          return {
            milliseconds: commit.milliseconds,
            author: commit.author,
            description,
          };
        });

        const data: StatisticsTask = {
          task: item.task,
          taskCode: item.taskCode,
          taskNumber: item.taskNumber,
          commits,
          description: Array.from(new Set(taskDescription)).join(', '),
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
          milliseconds,
          prIds: [],
          releaseIds: new Set(),
          createdBefore: firstCommit,
        };
        this.totalInfoByName.set(item.task, data);
        return data;
      })
      .sort((dotA: StatisticsTask, dotB: StatisticsTask) => dotB.lastCommit - dotA.lastCommit);

    this.commits.clear();
  }

  updateTotalInfo2() {
    this.totalInfo.forEach((task: StatisticsTask) => {
      task.releaseIds = Array.from(task.releaseIds);
    });
  }
}
