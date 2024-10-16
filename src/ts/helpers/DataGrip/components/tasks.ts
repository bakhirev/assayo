import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

import { increment } from 'ts/helpers/Math';

export default class DataGripByTasks {
  commits: HashMap<ICommit[]> = new Map();

  statistic: any = [];

  statisticByName: HashMap<any> = new Map();

  // achievements
  longTaskByAuthor: IHashMap<number> = {};

  clear() {
    this.commits.clear();
    this.statistic = [];
    this.statisticByName.clear();
    this.longTaskByAuthor = {};
  }

  addCommit(commit: ICommit) {
    if (this.commits.has(commit.task)) {
      this.commits.get(commit.task)?.push(commit);
    } else {
      this.commits.set(commit.task, [commit]);
    }
  }

  // TODO: тут двойной пробег получился. А должен был частями собрать инфу
  updateTotalInfo() {
    this.statistic = Array.from(this.commits, ([k, v]) => [k, v]) // @ts-ignore
      .map(([task, commits]: [string, ICommit[]]) => {
        const firstCommit = commits[0];
        const lastCommit = commits[commits.length - 1];
        const from = firstCommit.milliseconds;

        const shortInfo = {
          task,
          author: firstCommit.author,
          from,
          commits: 1,
          daysInWork: 1,
          prIds: [],
          releaseIds: new Set(),
          comments: firstCommit.text,
          types: firstCommit.type ? { [firstCommit.type]: 1 } : {},
          scope: firstCommit.scope ? { [firstCommit.scope]: 1 } : {},
        };

        if (commits.length === 1) return shortInfo;

        const messages = new Set();
        const timestamps = new Set();
        const authors = {};
        const types = {};
        const scope = {};
        commits.forEach((commit: ICommit) => {
          messages.add(commit.text);
          timestamps.add(commit.milliseconds);
          increment(authors, commit.author);
          increment(types, commit.type);
          increment(scope, commit.scope);
        });

        const comments = Array.from(messages).join(', ');
        const to = lastCommit.milliseconds;
        const daysInWork = timestamps.size;

        const longTaskByAuthor = this.longTaskByAuthor[shortInfo.author];
        if (!longTaskByAuthor || longTaskByAuthor < daysInWork) {
          this.longTaskByAuthor[shortInfo.author] = daysInWork;
        }

        return {
          ...shortInfo,
          to: to !== from ? to : undefined,
          commits: commits.length,
          timestamps: Array.from(timestamps),
          daysInWork,
          comments,
          authors,
          types,
          scope,
        };
      })
      .filter((dot) => dot.task)
      .sort((dotA, dotB) => dotB.from - dotA.from);

    this.statistic.forEach((item: any) => {
      this.statisticByName.set(item.task, item);
    });

    this.commits.clear();
  }
}
