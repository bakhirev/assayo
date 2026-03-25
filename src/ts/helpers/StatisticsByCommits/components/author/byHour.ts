import ICommit from 'ts/interfaces/Commit';

export default class StatisticsByHour {
  commitsByDayAndHour: number[][] = [];

  commitsByHour: number[] = [];

  constructor(commit: ICommit) {
    this.commitsByDayAndHour = (new Array(7)).fill(1).map(() => (new Array(24)).fill(0));
    this.commitsByHour = new Array(24).fill(0);
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    this.commitsByDayAndHour[commit.day][commit.hours] += 1;
    this.commitsByHour[commit.hours] += 1;
  }

  getTotalInfo() {
    return [
      this.commitsByDayAndHour,
      this.commitsByHour,
    ];
  }
}
