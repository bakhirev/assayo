import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';
import { WeightedAverage } from 'ts/helpers/Math';

import StatisticsByAuthors from './byAuthor';
import StatisticsByTaskCode from './byTaskCode';
import { getDaysBetween } from '../../helpers';

export default class StatisticsByCompany {
  commits: HashMap<any> = new Map();

  totalInfo: any = [];

  totalInfoByName: HashMap<any> = new Map();

  clear() {
    this.commits.clear();
    this.totalInfo = [];
    this.totalInfoByName.clear();
  }

  addCommit(commit: ICommit) {
    if (!commit.company) return;
    const statistic = this.commits.get(commit.company);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.lastCommit = commit.milliseconds;
    statistic.days.add(commit.timestamp);
    if (commit.task) statistic.tasks.add(commit.task);
    statistic.authors.addCommit(commit);
    statistic.taskCodes.addCommit(commit);
    statistic.linesInTask.update(commit.added + commit.changes + commit.removed);
  }

  #addNewCommit(commit: ICommit) {
    const linesInTask = new WeightedAverage();
    linesInTask.update(commit.added + commit.changes + commit.removed);
    this.commits.set(commit.company, {
      company: commit.company,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.task ? [commit.task] : []),
      authors: new StatisticsByAuthors(commit),
      taskCodes: new StatisticsByTaskCode(commit),
      linesInTask,
    });
  }

  updateTotalInfo(lastCommit: ICommit) {
    const dismissedLimit = lastCommit?.milliseconds - 60 * ONE_DAY;
    this.totalInfo = Array.from(this.commits.values())
      .map((item: any) => {
        const authors = item.authors.getTotalInfo();
        const taskCodes = item.taskCodes.getTotalInfo();
        const data = {
          company: item.company,
          from: item.firstCommit,
          to: item.lastCommit,
          authors,
          taskCodes,
          totalTasks: item.tasks.size,
          totalTaskCodes: taskCodes.length,
          totalDays: getDaysBetween(item.firstCommit, item.lastCommit),
          totalDaysWorked: item.days.size,
          totalAuthors: authors.length,
          isActive: item.lastCommit > dismissedLimit,
          linesInTask: Math.round(item.linesInTask.get()),
        };
        this.totalInfoByName.set(item.company, data);
        return data;
      })
      .sort((dotA: any, dotB: any) => dotB.totalTasks - dotA.totalTasks);

    this.commits.clear();
  }
}
