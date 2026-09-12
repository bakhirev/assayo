import ICommit from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import applicationConfig from 'ts/store/ApplicationConfig';
import { increment } from 'ts/helpers/Math';

import MinMaxCounter from '../helpers/MinMaxCounter';
import StatisticsByAuthor, { StatisticsAuthor } from './author';

export interface StatisticsTimestamp {
  commits: number;
  day: number;
  dayInMonth: number;
  month: number;
  year: number;
  week: number;
  timestamp: string;
  milliseconds: number;
  tasks: IHashMap<number>;
  tasksByAuthor: IHashMap<IHashMap<ICommit[]>>;
  addedAndChanges: number;
  messages: string[];
  tasksInDay?: number;
}

export interface StatisticsTimestampTotal {
  allCommitsByTimestamp: StatisticsTimestamp[];
  commitsByTimestampCounter: MinMaxCounter;
  changesByTimestampCounter: MinMaxCounter;
  tasksByTimestampCounter: MinMaxCounter;
  workByDay: number[];
  weekendPayment: number;
}

function getEmptyTotalInfo(): StatisticsTimestampTotal {
  return {
    allCommitsByTimestamp: [],
    commitsByTimestampCounter: new MinMaxCounter(),
    changesByTimestampCounter: new MinMaxCounter(),
    tasksByTimestampCounter: new MinMaxCounter(),
    workByDay: [],
    weekendPayment: 0,
  };
}

export default class StatisticsByTimestamp {
  commits: HashMap<StatisticsTimestamp> = new Map();

  commitsByAuthor: HashMap<HashMap<StatisticsTimestamp>> = new Map();

  totalInfo: StatisticsTimestampTotal = getEmptyTotalInfo();

  totalInfoByName: IHashMap<StatisticsTimestampTotal> = {};

  constructor() {
    this.clear();
  }

  clear() {
    this.commits.clear();
    this.commitsByAuthor.clear();
    this.totalInfo = getEmptyTotalInfo();
    this.totalInfoByName = {};
  }

  addCommit(commit: ICommit) {
    const commitByMilliseconds = this.commits.get(commit.timestamp);
    if (commitByMilliseconds) {
      this.#updateCommitByTimestamp(commitByMilliseconds, commit);
    } else {
      this.commits.set(commit.timestamp, this.#getDefaultCommitByTimestamp(commit));
    }

    let commitsByAuthor = this.commitsByAuthor.get(commit.author);
    if (!commitsByAuthor) {
      commitsByAuthor = new Map();
      this.commitsByAuthor.set(commit.author, commitsByAuthor);
    }

    const commitByAuthorMilliseconds = commitsByAuthor.get(commit.timestamp);
    if (commitByAuthorMilliseconds) {
      this.#updateCommitByTimestamp(commitByAuthorMilliseconds, commit);
    } else {
      commitsByAuthor.set(commit.timestamp, this.#getDefaultCommitByTimestamp(commit));
    }
  }

  #updateCommitByTimestamp(statistic: StatisticsTimestamp, commit: ICommit) {
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

  #getDefaultCommitByTimestamp(commit: ICommit): StatisticsTimestamp {
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

  updateTotalInfo(statisticsByAuthor: StatisticsByAuthor) {
    this.totalInfo = this.#getTotalInfo(this.commits);
    this.totalInfo.weekendPayment = 0;
    for (let author of this.commitsByAuthor.keys()) {
      const statistic = this.#getTotalInfo(this.commitsByAuthor.get(author) as HashMap<StatisticsTimestamp>);
      statistic.weekendPayment = this.#getWeekendPaymentByAuthor(
        statistic,
        statisticsByAuthor.totalInfoByName.get(author),
      );
      this.totalInfoByName[author || ''] = statistic;
      this.totalInfo.weekendPayment += statistic.weekendPayment;
    }
  }

  #getTotalInfo(uniqCommitsByTimestamp: HashMap<StatisticsTimestamp>): StatisticsTimestampTotal {
    const allCommitsByTimestamp = Array.from(uniqCommitsByTimestamp.values());

    const commitsCounter = new MinMaxCounter();
    const changesCounter = new MinMaxCounter();
    const tasksCounter = new MinMaxCounter();
    const workByDay = (new Array(7)).fill(0);

    allCommitsByTimestamp.forEach((current: StatisticsTimestamp) => {
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

  #getWeekendPaymentByAuthor(statistic: StatisticsTimestampTotal, statisticsByAuthor?: StatisticsAuthor) {
    if (!statisticsByAuthor || statisticsByAuthor.isStaff) return 0;
    const salaryInMonth = applicationConfig.getMiddleSalaryInMonth();
    const salaryInDay = (salaryInMonth / 22) * 2;
    const saturday = statistic.workByDay[5] * salaryInDay;
    const sunday = statistic.workByDay[6] * salaryInDay;
    return saturday + sunday;
  }
}
