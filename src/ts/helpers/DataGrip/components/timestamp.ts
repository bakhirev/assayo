import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import settingsStore from 'ts/store/Settings';
import { increment } from 'ts/helpers/Math';

import MinMaxCounter from './counter';

export default class DataGripByTimestamp {
  commits: IHashMap<any> = {};

  commitsByAuthor: IHashMap<any> = {};

  statistic: any = [];

  statisticByAuthor: any = {};

  constructor() {
    this.clear();
  }

  clear() {
    this.commits = {};
    this.commitsByAuthor = {};
    this.statistic = [];
    this.statisticByAuthor = {};
  }

  addCommit(commit: ICommit) {
    if (this.commits[commit.milliseconds]) {
      this.#updateCommitByTimestamp(commit, this.commits[commit.milliseconds]);
    } else {
      this.commits[commit.milliseconds] = this.#getDefaultCommitByTimestamp(commit);
    }
    if (!this.commitsByAuthor[commit.author]) {
      this.commitsByAuthor[commit.author] = {};
    }
    if (this.commitsByAuthor[commit.author][commit.milliseconds]) {
      this.#updateCommitByTimestamp(commit, this.commitsByAuthor[commit.author][commit.milliseconds]);
    } else {
      this.commitsByAuthor[commit.author][commit.milliseconds] = this.#getDefaultCommitByTimestamp(commit);
    }
  }

  #updateCommitByTimestamp(commit: ICommit, statistic: any) {
    statistic.commits += 1;
    statistic.addedAndChanges += commit.added + commit.changes;
    increment(statistic.tasks, commit.task);
    if (!statistic.tasksByAuthor[commit.author]) {
      statistic.tasksByAuthor[commit.author] = {};
    }
    if (statistic.tasksByAuthor[commit.author][commit.task]) {
      statistic.tasksByAuthor[commit.author][commit.task].push(commit);
    } else {
      statistic.tasksByAuthor[commit.author][commit.task] = [commit];
    }
    statistic.messages.push(commit.message);
  }

  #getDefaultCommitByTimestamp(commit: ICommit) {
    return {
      commits: 1,
      day: commit.day,
      dayInMonth: commit.dayInMonth,
      month: commit.month,
      year: commit.year,
      week: commit.week,
      timestamp: commit.timestamp,
      milliseconds: commit.milliseconds,
      tasks: { [commit.task]: 1 },
      tasksByAuthor: { [commit.author]: { [commit.task]: [commit] } },
      addedAndChanges: commit.added + commit.changes,
      messages: [commit.message],
    };
  }

  updateTotalInfo(dataGripByAuthor: any) {
    this.statistic = this.#getTotalInfo(this.commits);
    this.statistic.weekendPayment  = 0;
    for (let author in this.commitsByAuthor) {
      const statistic = this.#getTotalInfo(this.commitsByAuthor[author]);
      statistic.weekendPayment = this.#getWeekendPaymentByAuthor(statistic, dataGripByAuthor.statisticByName[author]);
      this.statisticByAuthor[author] = statistic;
      this.statistic.weekendPayment += statistic.weekendPayment;
    }
  }

  #getTotalInfo(uniqCommitsByTimestamp: any) {
    const allCommitsByTimestamp = Object.values(uniqCommitsByTimestamp);

    const commitsCounter = new MinMaxCounter();
    const changesCounter = new MinMaxCounter();
    const tasksCounter = new MinMaxCounter();
    const workByDay = (new Array(7)).fill(0);


    allCommitsByTimestamp.forEach((current: any) => {
      current.tasksInDay = Object.keys(current.tasks).length;
      workByDay[current.day] += 1;
      commitsCounter.update(current.commits, current);
      changesCounter.update(current.addedAndChanges, current);
      tasksCounter.update(current.tasksInDay, current);
    });

    return {
      allCommitsByTimestamp,
      commitsByTimestampCounter: commitsCounter,
      changesByTimestampCounter: changesCounter,
      tasksByTimestampCounter: tasksCounter,
      workByDay,
      weekendPayment: 0,
    };
  }

  #getMiddleValue(list: any, property: string) {
    const sortList = list.sort((a: any, b: any) => b[property] - a[property]);
    const gap = Math.floor(sortList.length * 0.05);
    return sortList.slice(gap, sortList.length - gap);
  }

  #getWeekendPaymentByAuthor(statistic: any, dataGripByAuthor: any) {
    if (dataGripByAuthor.isStaff) return 0;
    const salaryInDay = settingsStore.getMiddleSalaryInDay(dataGripByAuthor.author);
    const saturday = statistic.workByDay[5] * salaryInDay;
    const sunday = statistic.workByDay[6] * salaryInDay;
    return saturday + sunday;
  }
}
