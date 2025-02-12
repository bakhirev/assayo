import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

export default class DataGripByTaskNumbersDate {
  commits: HashMap<any> = new Map();

  clear() {
    this.commits.clear();
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode || !commit.week) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommitByTaskCode(statistic, commit);
    } else {
      this.#addCommitByTaskCode(commit);
    }
  }

  #updateCommitByTaskCode(statistic: any, commit: ICommit) {
    const milliseconds = statistic.taskNumbers.get(commit.taskNumber);
    if (!milliseconds || commit.milliseconds < milliseconds) {
      statistic.taskNumbers.set(commit.taskNumber, {
        task: commit.task,
        milliseconds: commit.milliseconds,
      });
    }
  }

  #addCommitByTaskCode(commit: ICommit) {
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

  updateTotalInfo(dataGripByTasks: any) {
    Array.from(this.commits.values()).forEach((dot: any) => {
      const taskNumbers = Array.from(dot.taskNumbers.entries())
        .sort((a: any, b: any) => a[0] - b[0])
        .reverse();

      taskNumbers.forEach((item: any, index: number) => {
        const next = taskNumbers[index + 1];
        if (!next) return;
        if (item[1].milliseconds <= next[1].milliseconds) return;
        item[1].milliseconds = next[1].milliseconds;

        const task = dataGripByTasks.statisticByName.get(item[1].task);
        task.createdBefore = next[1].milliseconds;
        task.daysInJira = (task.from - task.createdBefore) / ONE_DAY;
      });
    });

    this.commits.clear();
  }
}
