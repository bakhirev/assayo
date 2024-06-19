import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import { ONE_DAY } from 'ts/helpers/formatter';

export default class DataGripByTasks {
  commits: IHashMap<ICommit[]> = {};

  statistic: any = [];

  // achievements
  longTaskByAuthor: IHashMap<number> = {};

  clear() {
    this.commits = {};
    this.statistic = [];
    this.longTaskByAuthor = {};
  }

  addCommit(commit: ICommit) {
    if (this.commits[commit.task]) {
      this.#updateCommitByTask(commit);
    } else {
      this.#addCommitByTask(commit);
    }
  }

  #updateCommitByTask(commit: ICommit) {
    this.commits[commit.task].push(commit);
  }

  #addCommitByTask(commit: ICommit) {
    this.commits[commit.task] = [commit];
  }

  updateTotalInfo(PRs: any) {
    this.statistic = Object.entries(this.commits)
      .map(([task, commits]: [string, ICommit[]]) => {
        const firstCommit = commits[0];
        const lastCommit = commits[commits.length - 1];
        const from = firstCommit.milliseconds;
        const pr = PRs.prByTask[task] ? PRs.pr[PRs.prByTask[task]] : null;

        const shortInfo = {
          task,
          author: firstCommit.author,
          from,
          commits: 1,
          daysInWork: 1,
          prDate: pr?.milliseconds,
          prDelayDays: pr?.delayDays,
          prAuthor: firstCommit.author === pr?.author ? null : pr?.author,
          comments: firstCommit.text,
          types: firstCommit.type && firstCommit.type !== '—' ? [firstCommit.type] : [],
          scope: firstCommit.scope && firstCommit.scope !== '—' ? [firstCommit.scope] : [],
        };

        if (commits.length === 1) return shortInfo;

        const authors = new Set();
        const messages = new Set();
        const types = new Set();
        const scope = new Set();
        commits.forEach((commit: ICommit) => {
          authors.add(commit.author);
          messages.add(commit.text);
          if (commit.type !== '—') types.add(commit.type);
          if (commit.scope !== '—') scope.add(commit.scope);
        });

        const comments = Array.from(messages).join(', ');
        const to = lastCommit.milliseconds;
        const daysInWork = Math.ceil((to - from) / ONE_DAY) + 1;

        const longTaskByAuthor = this.longTaskByAuthor[shortInfo.author];
        if (!longTaskByAuthor || longTaskByAuthor < daysInWork) {
          this.longTaskByAuthor[shortInfo.author] = daysInWork;
        }

        return {
          ...shortInfo,
          to: to !== from ? to : undefined,
          commits: commits.length,
          daysInWork,
          authors: Array.from(authors),
          comments,
          types: Array.from(types),
          scope: Array.from(scope),
        };
      })
      .filter((dot) => dot.task)
      .sort((dotA, dotB) => dotB.from - dotA.from);

    this.commits = {};
  }
}
