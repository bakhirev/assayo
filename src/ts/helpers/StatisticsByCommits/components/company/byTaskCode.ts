import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

export default class StatisticsByTaskCode {
  commits: HashMap<any> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.lastCommit = commit.milliseconds;
    statistic.days.add(commit.timestamp);
    if (commit.taskNumber) statistic.tasks.add(commit.taskNumber);
    if (commit.author) statistic.authors.add(commit.author);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.taskCode, {
      taskCode: commit.taskCode,
      firstCommit: commit.milliseconds,
      lastCommit: commit.milliseconds,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.taskNumber ? [commit.taskNumber] : []),
      authors: new Set(commit.author ? [commit.author] : []),
    });
  }

  getTotalInfo() {
    return Array.from(this.commits.values())
      .map((item: any) => ({
        taskCode: item.taskCode,
        totalDaysWorked: item.days.size,
        totalTasks: item.tasks.size,
        totalAuthors: item.authors.size,
        authors: Array.from(item.authors),
        firstCommit: item.firstCommit,
        lastCommit: item.lastCommit,
      }))
      .filter((item: any) => item.totalDaysWorked > 1)
      .sort((itemA: any, itemB: any) => (itemB.totalDaysWorked - itemA.totalDaysWorked));
  }
}
