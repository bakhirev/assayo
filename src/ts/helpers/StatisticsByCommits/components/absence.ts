import { HashMap } from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';
import { ONE_DAY } from 'ts/helpers/formatter';

export interface StatisticsAbsenceTime {
  milliseconds: number;
  year: number;
  month: number;
  day: number;
  timestamp: string;
}

export interface StatisticsAbsence {
  author: string;
  duration: number;
  from: StatisticsAbsenceTime,
  to: StatisticsAbsenceTime
}

export default class StatisticsByAbsence {
  lastCommitDate: HashMap<any> = new Map();

  totalInfo: StatisticsAbsence[] = [];

  totalInfoByName: HashMap<StatisticsAbsence[]> = new Map();

  clear() {
    this.lastCommitDate.clear();
    this.totalInfo = [];
  }

  addCommit(commit: ICommit) {
    const from = this.lastCommitDate.get(commit.author);
    if (from) {
      this.#update(from, commit);
    } else {
      this.#add(commit);
    }
  }

  #update(from: any, commit: ICommit) {
    const to = commit.milliseconds;
    let duration = ((to - from.milliseconds) / ONE_DAY) - 2;
    if (commit.month === 0 && commit.dayInMonth <= 11) duration -= 10;
    if (commit.month === 5 && commit.dayInMonth <= 11) duration -= 4;
    this.#add(commit);

    if (!duration || duration <= 7) return;
    const fromDate = new Date(from.milliseconds + ONE_DAY);
    const toDate = new Date(to - ONE_DAY);
    this.totalInfo.push({
      author: commit.author,
      duration: Math.round(duration),
      from: this.#getTimes(fromDate, from.timestamp),
      to: this.#getTimes(toDate, commit.timestamp),
    });
  }

  #getTimes(date: any, timestamp: string) {
    return {
      // для календаря отпусков (фактический)
      milliseconds: date.getTime(),
      year: date.getUTCFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      // для календаря событий (первый. раб. день)
      timestamp,
    };
  }

  #add(commit: ICommit) {
    this.lastCommitDate.set(commit.author, {
      milliseconds: commit.milliseconds,
      timestamp: commit.timestamp,
    });
  }

  updateTotalInfo(statisticsByAuthor: any) {
    this.totalInfo = this.totalInfo
      .filter((absence: StatisticsAbsence) => !statisticsByAuthor.totalInfoByName[absence.author]?.isStaff)
      .sort((a: StatisticsAbsence, b: StatisticsAbsence) => b.to.milliseconds - a.to.milliseconds);

    this.totalInfo.forEach((absence: StatisticsAbsence) => {
      const statistic = this.totalInfoByName.get(absence.author) || [];
      statistic.push(absence);
      this.totalInfoByName.set(absence.author, statistic);
    });

    this.lastCommitDate.clear();
  }
}
