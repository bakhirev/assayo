import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';

import { ONE_DAY } from 'ts/helpers/formatter';
import { increment } from 'ts/helpers/Math';

import settingsStore from 'ts/store/Settings';
import userSettings from 'ts/store/UserSettings';

export default class DataGripByAuthor {
  list: string[] = [];

  commits: IHashMap<any> = {};

  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  employment: IHashMap<string[]> = {};

  clear() {
    this.list = [];
    this.commits = {};
    this.statistic = [];
    this.statisticByName = {};
  }

  addCommit(commit: ICommit) {
    if (this.commits[commit.author]) {
      this.#updateCommitByAuthor(commit);
    } else {
      this.#addCommitByAuthor(commit);
    }
    this.#setMoneyByMonth(commit);
  }

  #updateCommitByAuthor(commit: ICommit) {
    const statistic = this.commits[commit.author];
    statistic.commits += 1;
    statistic.lastCommit = commit;
    statistic.days[commit.timestamp] = true;
    statistic.tasks[commit.task] = commit.added + commit.changes + commit.removed
      + (statistic.tasks[commit.task] ? statistic.tasks[commit.task] : 0);
    increment(statistic.types, commit.type);
    increment(statistic.scopes, commit.scope);
    statistic.hours.push(commit.hours);
    statistic.messageLength.push(commit.text.length);
    statistic.totalMessageLength += commit.text.length || 0;
    statistic.maxMessageLength = commit.text.length > statistic.maxMessageLength
      ? commit.text.length
      : statistic.maxMessageLength;
    try {
      statistic.commitsByDayAndHour[commit.day][commit.hours] += 1;
    } catch (e: any) {
      debugger;
    }
    statistic.commitsByHour[commit.hours] += 1;
    statistic.wordStatistics = DataGripByAuthor.#updateWordStatistics(commit, statistic.wordStatistics);
  }

  #addCommitByAuthor(commit: ICommit) {
    const commitsByDayAndHour = DataGripByAuthor.getDefaultCommitsByDayAndHour();
    commitsByDayAndHour[commit.day][commit.hours] += 1;

    const commitsByHour = new Array(24).fill(0);
    commitsByHour[commit.hours] += 1;

    this.commits[commit.author] = {
      author: commit.author,
      commits: 1,
      firstCommit: commit,
      lastCommit: commit,
      days: { [commit.timestamp]: true },
      tasks: { [commit.task]: commit.added + commit.changes + commit.removed },
      types: { [commit.type]: 1 },
      scopes: { [commit.scope]: 1 },
      hours: [commit.hours],
      commitsByDayAndHour,
      commitsByHour,
      messageLength: [commit.text.length || 0],
      totalMessageLength: commit.text.length || 0,
      maxMessageLength: commit.text.length || 0,
      wordStatistics: DataGripByAuthor.#updateWordStatistics(commit),
      moneyByMonth: {},
    };
  }

  #setMoneyByMonth(commit: ICommit) {
    const key = `${commit.year}-${commit.month}`;
    if (this.commits[commit.author].moneyByMonth[key]) {
      this.#updateMoneyByMonth(commit, key);
    } else {
      this.#addMoneyByMonth(commit, key);
    }
  }

  #updateMoneyByMonth(commit: ICommit, key: string) {
    const statistic = this.commits[commit.author].moneyByMonth[key];
    if (statistic.alreadyAdded[commit.milliseconds]) return;
    statistic.alreadyAdded[commit.milliseconds] = true;

    const isWorkDay = statistic.contract.workDaysInWeek[commit.day];
    if (isWorkDay) {
      statistic.workDay += 1;
    } else {
      statistic.weekDay += 1;
    }
  }

  #addMoneyByMonth(commit: ICommit, key: string) {
    const contract = userSettings.getEmploymentContract(commit.author, commit.milliseconds);
    const isWorkDay = contract.workDaysInWeek[commit.day];
    this.commits[commit.author].moneyByMonth[key] = {
      workDay: isWorkDay ? 1 : 0,
      weekDay: isWorkDay ? 0 : 1,
      alreadyAdded: {
        [commit.milliseconds]: true,
      },
      contract,
    };
  }



  static getDefaultCommitsByDayAndHour() {
    return (new Array(7)).fill(1).map(() => (new Array(24)).fill(0));
  }

  static #updateWordStatistics(commit: ICommit, total = {}) {
    const LIMIT_WORD_LENGTH = 2;
    const disabledWords = { for: 1, fix: 1 };

    commit.text.toLowerCase().split(' ').forEach(word => {
      if (word.length <= LIMIT_WORD_LENGTH || disabledWords[word]) return;
      increment(total, word);
    });

    return total;
  }

  updateTotalInfo() {
    const HOLIDAYS = 118 + 22; // праздники + выходные + отпуск
    const WORK_AND_HOLIDAYS = (HOLIDAYS / (365 - HOLIDAYS));
    const lastCommit = settingsStore.commits[settingsStore.commits.length - 1];
    const dismissedLimit = lastCommit?.milliseconds - 32 * ONE_DAY;

    this.employment = {
      staff: [],
      dismissed: [],
      active: [],
    };

    this.statistic = Object.values(this.commits)
      .sort((dotA: any, dotB: any) => dotB.commits - dotA.commits)
      .map((dot: any) => {
        const from = dot.firstCommit.milliseconds;
        const to = dot.lastCommit.milliseconds;

        const workDays = Object.keys(dot.days).length;
        const allDaysInProject = Math.ceil((to - from) / ONE_DAY);
        const lazyDays = Math.floor((allDaysInProject * WORK_AND_HOLIDAYS) - workDays) + 1;

        const middleSalaryInMonth = userSettings.getMiddleSalaryInMonth(dot.author, from, to);
        const middleSalaryInDay = middleSalaryInMonth / 22;
        const moneyWorked = Math.ceil(workDays * middleSalaryInDay);
        const moneyLosses = lazyDays > 0
          ? Math.ceil(lazyDays * middleSalaryInDay)
          : 0;
        const moneyAll = Math.ceil((allDaysInProject / 30) * middleSalaryInMonth);

        const tasksEntries = Object.entries(dot.tasks).filter(t => t[0]);
        const tasks = tasksEntries.map(t => t[0]);
        const tasksSize = tasksEntries.map(t => t[1]);

        dot.hours.sort();
        dot.messageLength.sort();
        const middleMessageLength = Math.round(dot.totalMessageLength / dot.commits);
        const wordStatistics = Object.entries(dot.wordStatistics)
          .sort((dotA: any, dotB: any) => dotB[1] - dotA[1]);

        const daysWorkedLosses = workDays + (lazyDays > 0 ? lazyDays : 0);
        const percentWork = workDays * 100 / daysWorkedLosses;
        const isStaff = daysWorkedLosses < 20 || (percentWork < 15);

        const authorInfo = {
          ...dot,
          tasks,
          scopes: Object.keys(dot.scopes).length,
          daysForTask: isStaff ? 0 : workDays / tasks.length,
          taskInDay: isStaff ? 0 : tasks.length / workDays,
          changesForTask: DataGripByAuthor.getMiddleValue(tasksSize),

          days: workDays,
          money: isStaff ? 0 : moneyWorked,
          allDaysInProject,
          lazyDays,

          daysAll: allDaysInProject,
          daysLosses: lazyDays > 0 ? lazyDays : 0,
          daysWorked: workDays,
          daysWorkedLosses: workDays + (lazyDays > 0 ? lazyDays : 0),

          moneyAll: isStaff ? 0 : moneyAll,
          moneyLosses: isStaff ? 0 : moneyLosses,
          moneyWorked: isStaff ? 0 : moneyWorked,
          isDismissed: dot.lastCommit.milliseconds < dismissedLimit,
          isStaff,

          middleMessageLength,
          maxMessageLength: dot.maxMessageLength,
          commitsByDayAndHourTotal: DataGripByAuthor.getTotalCommitsByDayAndHour(dot.commitsByDayAndHour),
          wordStatistics,
        };
        this.statisticByName[authorInfo.author] = authorInfo;

        if (authorInfo.isStaff)  this.employment.staff.push(authorInfo.author);
        else if (authorInfo.isDismissed) this.employment.dismissed.push(authorInfo.author);
        else this.employment.active.push(authorInfo.author);

        return authorInfo;
      });

    this.list = [
      ...this.employment.active,
      ...this.employment.dismissed,
      ...this.employment.staff,
    ];

    this.statistic.sort((a: any, b: any) => (
      this.list.indexOf(a.author) - this.list.indexOf(b.author)
    ));
  }

  // TODO: зачем эти функции?
  static getMiddleValue(list: any) {
    const length = list.length;
    const gap = Math.round(length * 0.05);
    const middlePart = length > 5
      ? list.sort((a: number, b: number) => a - b).slice(gap, length - gap - 1)
      : list;
    return Math.round(middlePart.reduce((a: number, v: number) => a + v, 0) / middlePart.length);
  }

  static getTotalCommitsByDayAndHour(commitsByDayAndHour: any) {
    const total = commitsByDayAndHour.map((week: number[]) => Math.max(...week));
    total.push(Math.min(...total));
    total.push(Math.max(...total));
    return total;
  }
}
