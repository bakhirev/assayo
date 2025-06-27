import ICommit from 'ts/interfaces/Commit';
import HashMap from 'ts/interfaces/HashMap';
import { increment } from 'ts/helpers/Math';

export default class DataGripByWeek {
  commits: HashMap<any> = new Map;

  statistic: any = [];

  constructor() {
    this.clear();
  }

  clear() {
    this.commits.clear();
    this.statistic = [];
  }

  addCommit(commit: ICommit) {
    const statistic = this.commits.get(commit.week);
    if (statistic) {
      this.#updateCommitByWeek(statistic, commit);
    } else {
      this.#addCommitByWeek(commit);
    }
  }

  #updateCommitByWeek(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.timestamp.to = commit.timestamp;
    if (commit.task) statistic.tasks.add(commit.task);

    const setDefault = (s: any, v: string) => {
      if (!s[v]) s[v] = {};
      return s[v];
    };

    for (let type in statistic.changes) statistic.changes[type] += (commit[type] || 0);

    setDefault(statistic.authors, commit.author)[commit.task] = true;
    setDefault(statistic.workDays, commit.author)[commit.day] = true;

    if (!statistic.typeByAuthor[commit.author]) statistic.typeByAuthor[commit.author] = {};
    increment(statistic.typeByAuthor[commit.author], commit.type);
    increment(statistic.types, commit.type);
  }

  #addCommitByWeek(commit: ICommit) {
    this.commits.set(commit.week, {
      commits: 1,
      timestamp: { from: commit.timestamp },
      tasks: commit.task ? new Set([commit.task]) : new Set(),

      types: { [commit.type]: 1 },
      changes: { added: commit.added, changes: commit.changes, removed: commit.removed },
      authors: { [commit.author]: { [commit.task]: true } },
      workDays: { [commit.author]: { [commit.day]: true } },
      typeByAuthor: { [commit.author]: { [commit.type]: 1 } },
    });
  }

  updateTotalInfo(dataGripByAuthor: any) {
    this.statistic = Array.from(this.commits.values())
      .map((dot: any) => {
        const authors = {};
        for (let name in dot.authors) authors[name] = Object.keys(dot.authors[name]).filter(v => v).length;

        const workDays = {};
        const lazyDays = {};
        const weekDays = {};

        let workDaysTotal = 0;
        let lazyDaysTotal = 0;
        let authorsLength = 0;

        for (let name in dot.workDays) {
          if (dataGripByAuthor.statisticByName[name].isStaff) continue;
          authorsLength += 1;
          workDays[name] = Object.keys(dot.workDays[name]).length;
          workDaysTotal += workDays[name];
          // userSettings.getCurrentWorkDaysInWeek(name); TODO: need middle salary in month
          const limit = 5;
          const lazyDaysValue = limit - workDays[name];
          const weekDaysValue = workDays[name] - limit;

          lazyDays[name] = lazyDaysValue > 0 ? lazyDaysValue : 0;
          weekDays[name] = weekDaysValue > 0 ? weekDaysValue : 0;
          lazyDaysTotal += lazyDays[name];
        }

        const taskInDay = {};
        for (let name in dot.workDays) taskInDay[name] = (authors[name] && workDays[name])
          ? (authors[name] / workDays[name])
          : 0;

        return {
          ...dot,
          tasks: dot.tasks.size,
          authors,
          workDays,
          lazyDays,
          weekDays,
          workDaysTotal,
          lazyDaysTotal,
          taskInDay,
          authorsLength,
          changesLength: dot.changes.added + dot.changes.changes + dot.changes.removed,
        };
      }).reverse();
  }
}
