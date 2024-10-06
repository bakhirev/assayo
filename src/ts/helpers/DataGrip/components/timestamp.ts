import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import userSettings from 'ts/store/UserSettings';
import { increment } from 'ts/helpers/Math';

import MinMaxCounter from './counter';

export default class DataGripByTimestamp {
  commits: HashMap<any> = new Map();

  commitsByAuthor: HashMap<any> = new Map();

  statistic: any = [];

  statisticByAuthor: any = {};

  constructor() {
    this.clear();
  }

  clear() {
    this.commits.clear();
    this.commitsByAuthor.clear();
    this.statistic = [];
    this.statisticByAuthor = {};
  }

  addCommit(commit: ICommit) {
    const commitByMilliseconds = this.commits.get(commit.milliseconds);
    if (commitByMilliseconds) {
      this.#updateCommitByTimestamp(commitByMilliseconds, commit);
    } else {
      this.commits.set(commit.milliseconds, this.#getDefaultCommitByTimestamp(commit));
    }

    let commitsByAuthor = this.commitsByAuthor.get(commit.author);
    if (!commitsByAuthor) {
      commitsByAuthor = new Map();
      this.commitsByAuthor.set(commit.author, commitsByAuthor);
    }

    const commitByAuthorMilliseconds = commitsByAuthor.get(commit.milliseconds);
    if (commitByAuthorMilliseconds) {
      this.#updateCommitByTimestamp(commitByAuthorMilliseconds, commit);
    } else {
      commitsByAuthor.set(commit.milliseconds, this.#getDefaultCommitByTimestamp(commit));
    }
  }

  #updateCommitByTimestamp(statistic: any, commit: ICommit) {
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
    for (let author of this.commitsByAuthor.keys()) {
      const statistic = this.#getTotalInfo(this.commitsByAuthor.get(author));
      statistic.weekendPayment = this.#getWeekendPaymentByAuthor(statistic, dataGripByAuthor.statisticByName[author || '']);
      this.statisticByAuthor[author || ''] = statistic; // TODO: странный результат, неверный расчёт?
      this.statistic.weekendPayment += statistic.weekendPayment;
    }
  }

  #getTotalInfo(uniqCommitsByTimestamp: HashMap<any>) {
    const allCommitsByTimestamp = Array.from(uniqCommitsByTimestamp.values());

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

  #getWeekendPaymentByAuthor(statistic: any, dataGripByAuthor: any) {
    if (dataGripByAuthor.isStaff) return 0;
    const salaryInMonth = userSettings.getCurrentSalaryInMonth(dataGripByAuthor.author);
    const salaryInDay = (salaryInMonth / 22) * 2; // TODO: только по ТК РФ
    const saturday = statistic.workByDay[5] * salaryInDay;
    const sunday = statistic.workByDay[6] * salaryInDay;
    return saturday + sunday;
  }
}
