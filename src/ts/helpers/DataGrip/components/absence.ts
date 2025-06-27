import { HashMap } from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';
import { ONE_DAY } from 'ts/helpers/formatter';

export interface DataGripAbsence {
  author: string;
  from: number;
  to: number;
  duration: number;
  timestamp: {
    from: string;
    to: string;
  }
}

export default class DataGripByAbsence {
  lastCommitDate: HashMap<any> = new Map();

  statistic: DataGripAbsence[] = [];

  statisticByName: HashMap<DataGripAbsence[]> = new Map();

  clear() {
    this.lastCommitDate.clear();
    this.statistic = [];
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
    this.statistic.push({
      author: commit.author,
      from: from.milliseconds + ONE_DAY,
      to: to - ONE_DAY,
      timestamp: {
        from: from.timestamp,
        to: commit.timestamp,
      },
      duration,
    });
  }

  #add(commit: ICommit) {
    this.lastCommitDate.set(commit.author, {
      milliseconds: commit.milliseconds,
      timestamp: commit.timestamp,
    });
  }

  updateTotalInfo(dataGripByAuthor: any) {
    this.statistic = this.statistic
      .filter((absence: DataGripAbsence) => !dataGripByAuthor.statisticByName[absence.author]?.isStaff)
      .sort((a: DataGripAbsence, b: DataGripAbsence) => b.to - a.to);

    this.statistic.forEach((absence: DataGripAbsence) => {
      const statistic = this.statisticByName.get(absence.author) || [];
      statistic.push(absence);
      this.statisticByName.set(absence.author, statistic);
    });

    this.lastCommitDate.clear();
  }
}
