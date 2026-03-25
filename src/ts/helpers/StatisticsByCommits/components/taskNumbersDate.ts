import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

function getDaysFromTo(dateCreate: number, dateMerge: number) {
  const delta = dateMerge - dateCreate;
  if (delta < ONE_DAY) return 1;
  return Math.round(delta / ONE_DAY);
}

export default class StatisticsByTaskNumbersDate {
  commits: HashMap<any> = new Map();

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

  #updateCommit(statistic: any, commit: ICommit) {
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

  updateTotalInfo(statisticsByTasks: any) {
    Array.from(this.commits.values()).forEach((dot: any) => {
      const taskNumbers = Array.from(dot.taskNumbers.entries())
        .sort((a: any, b: any) => a[0] - b[0]) // 123, 124, 125
        .reverse(); // 125, 124, 123

      taskNumbers.forEach((item: any, index: number) => {
        const next = taskNumbers[index + 1];
        if (!next) return;
        if (next[1].milliseconds <= item[1].milliseconds) return;
        next[1].milliseconds = item[1].milliseconds;

        const task = statisticsByTasks.totalInfoByName.get(next[1].task);
        task.createdBefore = item[1].milliseconds;
        task.totalDaysInBacklog = getDaysFromTo(task.createdBefore, task.firstCommit);
      });
    });

    this.commits.clear();
  }
}
