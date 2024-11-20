import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

export default class DataGripByTaskCodes {
  commits: HashMap<any> = new Map();

  statistic: any = [];

  clear() {
    this.commits.clear();
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    if (!commit.taskCode) return;
    const statistic = this.commits.get(commit.taskCode);
    if (statistic) {
      this.#updateCommitByTaskCode(statistic, commit);
    } else {
      this.#addCommitByTaskCode(commit);
    }
  }

  #updateCommitByTaskCode(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.lastCommit = commit;
    statistic.days.set(commit.timestamp, true);
    statistic.authors.add(commit.author);
  }

  #addCommitByTaskCode(commit: ICommit) {
    this.commits.set(commit.taskCode, {
      taskCode: commit.taskCode,
      commits: 1,
      firstCommit: commit,
      lastCommit: commit,
      days: new Map([[commit.timestamp, true]]),
      authors: new Set([commit.author]),
    });
  }

  updateTotalInfo(lastCommit: ICommit, dataGripByAuthor: any) {
    const dismissedLimit = lastCommit?.milliseconds - 32 * ONE_DAY;
    this.statistic = Array.from(this.commits.values())
      .map((dot: any) => {
        const authors = Array.from(dot.authors);
        const totalWorked = authors.reduce((sum: any, name: any) => {
          const author = dataGripByAuthor.statisticByName[name];
          const value = (author.isStaff || author.isDismissed) ? 0 : 1;
          return sum + value;
        }, 0);

        return {
          taskCode: dot.taskCode,
          commits: dot.commits,
          from: dot.firstCommit.timestamp,
          to: dot.lastCommit.timestamp,
          authors,
          totalDays: (dot.lastCommit.milliseconds - dot.firstCommit.milliseconds) / ONE_DAY,
          totalDaysWorked: dot.days.size,
          totalAuthors: authors.length,
          totalWorked,
          isActive: dot.lastCommit.milliseconds > dismissedLimit,
        };
      })
      .sort((dotA: any, dotB: any) => dotB.totalDays - dotA.totalDays);

    this.commits.clear();
  }
}
