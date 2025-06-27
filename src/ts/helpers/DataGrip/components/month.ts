import { HashMap } from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';

export interface DataGripDay {
  timestamp: string;
  dayInMonth: number;
  commitsNumber: number;
  userCommitNumbers: HashMap<number>;
  typeCommitNumbers: HashMap<number>;
}

export interface DataGripMonth {
  id: string;
  month: number;
  year: number;
  date: Date;
  milliseconds: number;

  days: DataGripDay[];
  tasksNumber: number;
  usersNumber: number;
}

export default class DataGripByMonth {
  months: HashMap<any> = new Map();

  statistic: DataGripMonth[] = [];

  maxCommitsInDay: number = 0;

  clear() {
    this.months.clear();
    this.statistic = [];
    this.maxCommitsInDay = 0;
  }

  #getKey(commit: ICommit) {
    return `${commit.year}-${commit.month}`;
  }

  addCommit(commit: ICommit) {
    const key = this.#getKey(commit);
    const statistic = this.months.get(key);
    if (statistic) {
      this.#update(statistic, commit);
    } else {
      this.#add(commit);
    }
  }

  #update(statistic: any, commit: ICommit) {
    const days = statistic.days.get(commit.dayInMonth);
    if (days) {
      this.#updateDay(days, commit);
    } else {
      this.#addDay(statistic.days, commit);
    }

    statistic.tasksNumber.add(commit.task);
    statistic.usersNumber.add(commit.author);
  }

  #add(commit: ICommit) {
    const key = this.#getKey(commit);
    const days = new Map();
    this.#addDay(days, commit);
    this.months.set(key, {
      id: key,
      month: commit.month,
      year: commit.year,
      milliseconds: commit.milliseconds,
      date: new Date(commit.milliseconds),
      days,
      tasksNumber: new Set([commit.task]),
      usersNumber: new Set([commit.author]),
    });
  }

  #updateDay(statistic: any, commit: ICommit) {
    statistic.commitsNumber += 1;
    statistic.userCommitNumbers.set(
      commit.author,
      (statistic.userCommitNumbers.get(commit.author) || 0) + 1,
    );
    statistic.typeCommitNumbers.set(
      commit.type,
      (statistic.typeCommitNumbers.get(commit.type) || 0) + 1,
    );
    if (statistic.commitsNumber > this.maxCommitsInDay) {
      this.maxCommitsInDay = statistic.commitsNumber;
    }
  }

  #addDay(hashMap: any, commit: ICommit) {
    hashMap.set(commit.dayInMonth, {
      dayInMonth: commit.dayInMonth,
      timestamp: commit.timestamp,
      commitsNumber: 1,
      userCommitNumbers: new Map([[ commit.author, 1]]),
      typeCommitNumbers: new Map([[ commit.type, 1]]),
    });
  }

  updateTotalInfo(dataGripByAuthor: any) {
    this.statistic = Array.from(this.months.values())
      .map((dot: any) => {
        dot.days = Array.from(dot.days.values());
        dot.tasksNumber = Array.from(dot.tasksNumber).length;
        dot.usersNumber = Array
          .from(dot.usersNumber) // @ts-ignore
          .filter((name) => !dataGripByAuthor.statisticByName[name]?.isStaff)
          .length;
        return dot;
      })
      .sort((a: DataGripMonth, b: DataGripMonth) => a.milliseconds - b.milliseconds);
    this.months.clear();
  }
}
