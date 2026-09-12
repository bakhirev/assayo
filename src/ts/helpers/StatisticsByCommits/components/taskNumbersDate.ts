import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

import StatisticsByTasks from './tasks';

function getDaysFromTo(dateCreate: number, dateMerge: number) {
  const delta = dateMerge - dateCreate;
  if (delta < ONE_DAY) return 1;
  return Math.round(delta / ONE_DAY);
}

export interface TaskNumberFirstSeen {
  task: string;
  milliseconds: number;
}

export interface TaskNumbersDate {
  taskCode: string;
  taskNumbers: HashMap<TaskNumberFirstSeen>;
}

export default class StatisticsByTaskNumbersDate {
  commits: HashMap<TaskNumbersDate> = new Map();

  clear() {
    this.commits.clear();
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode || !commit.taskNumber) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: TaskNumbersDate, commit: ICommit) {
    if (statistic.taskNumbers.has(commit.taskNumber)) return;
    statistic.taskNumbers.set(commit.taskNumber, {
      task: commit.task,
      milliseconds: commit.milliseconds,
    });
  }

  #addNewCommit(commit: ICommit) {
    const taskNumbers = new Map();
    taskNumbers.set(commit.taskNumber, {
      task: commit.task,
      milliseconds: commit.milliseconds,
    });
    this.commits.set(commit.taskCode, {
      taskCode: commit.taskCode,
      taskNumbers,
    });
  }

  updateTotalInfo(statisticsByTasks: StatisticsByTasks) {
    Array.from(this.commits.values()).forEach((dot: TaskNumbersDate) => {
      const taskNumbers = Array.from(dot.taskNumbers.entries())
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .reverse();

      taskNumbers.forEach((item, index: number) => {
        const next = taskNumbers[index + 1];
        if (!next) return;
        if (next[1].milliseconds <= item[1].milliseconds) return;
        next[1].milliseconds = item[1].milliseconds;

        const task = statisticsByTasks.totalInfoByName.get(next[1].task);
        if (!task) return;
        task.createdBefore = item[1].milliseconds;
        task.totalDaysInBacklog = getDaysFromTo(task.createdBefore, task.firstCommit);
      });
    });

    this.commits.clear();
  }
}
