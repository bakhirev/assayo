import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

export default class StatisticsByAuthors {
  commits: HashMap<any> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.author) return;
    const statistic = this.commits.get(commit.author);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.days.add(commit.timestamp);
    if (commit.task) statistic.tasks.add(commit.task);
  }

  #addNewCommit(commit: ICommit) {
    this.commits.set(commit.author, {
      author: commit.author,
      commits: 1,
      days: new Set([commit.timestamp]),
      tasks: new Set(commit.task ? [commit.task] : []),
    });
  }

  getTotalInfo() {
    let totalDays = 0;
    let totalAuthors = 0;
    const commitsByAuthor = {};
    const tasksByAuthor = {};
    Array.from(this.commits.values()).forEach((item: any) => {
      totalDays += item.days.size;
      totalAuthors += 1;
      commitsByAuthor[item.author] = item.commits;
      tasksByAuthor[item.author] = item.tasks.size;
    });
    return { totalDays, totalAuthors, commitsByAuthor, tasksByAuthor };
  }
}
