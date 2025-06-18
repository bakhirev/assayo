import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import Recommendations from 'ts/helpers/Recommendations';

import DataGripByAuthor from './components/author';
import DataGripByTeam from './components/team';
import DataGripByScope from './components/scope';
import DataGripByType from './components/type';
import DataGripByTimestamp from './components/timestamp';
import DataGripByMonth from './components/month';
import DataGripByWeek from './components/week';
import MinMaxCounter from './components/counter';
import DataGripByGet from './components/get';
import DataGripByPR from './components/pr';
import DataGripByTasks from './components/tasks';
import DataGripByRelease from './components/release';
import DataGripByScoring from './components/scoring';
import DataGripByTaskCodes from './components/taskCodes';
import DataGripByTaskNumbers from './components/taskNumbers';
import DataGripByTaskNumbersDate from './components/taskNumbersDate';
import DataGripByCompany from './components/company';
import DataGripByCountry from './components/country';

class DataGrip {
  firstLastCommit: any = new MinMaxCounter();

  author: any = new DataGripByAuthor();

  company: any = new DataGripByCompany();

  country: any = new DataGripByCountry();

  team: any = new DataGripByTeam();

  scope: any = new DataGripByScope();

  type: any = new DataGripByType();

  timestamp: any = new DataGripByTimestamp(); // deprecated

  month: any = new DataGripByMonth();

  week: any = new DataGripByWeek();

  recommendations: any = new Recommendations();

  get: any = new DataGripByGet();

  pr: any = new DataGripByPR();

  tasks: any = new DataGripByTasks();

  release: any = new DataGripByRelease();

  scoring: any = new DataGripByScoring();

  taskCodes: any = new DataGripByTaskCodes();

  taskNumbers: any = new DataGripByTaskNumbers();

  taskNumbersDate: any = new DataGripByTaskNumbersDate();

  clear() {
    this.firstLastCommit.clear();
    this.author.clear();
    this.company.clear();
    this.country.clear();
    this.team.clear();
    this.scope.clear();
    this.type.clear();
    this.timestamp.clear();
    this.month.clear();
    this.week.clear();
    this.recommendations.clear();
    this.get.clear();
    this.pr.clear();
    this.tasks.clear();
    this.release.clear();
    this.scoring.clear();
    this.taskCodes.clear();
    this.taskNumbers.clear();
    this.taskNumbersDate.clear();
  }

  addCommit(commit: ICommit | ISystemCommit, totalCommits: number) {
    if (commit.author === 'GitHub') return;
    this.pr.addCommit(commit); // @ts-ignore
    this.release.addCommit(commit); // @ts-ignore
    if (!commit.commitType) {
      this.firstLastCommit.update(commit.milliseconds, commit);
      this.author.addCommit(commit, totalCommits);
      this.scope.addCommit(commit);
      this.type.addCommit(commit);
      this.timestamp.addCommit(commit);
      this.month.addCommit(commit);
      this.get.addCommit(commit);
      this.week.addCommit(commit);
      this.tasks.addCommit(commit);
      this.taskCodes.addCommit(commit);
      this.taskNumbers.addCommit(commit);
      this.taskNumbersDate.addCommit(commit);
    }
  }

  updateTotalInfo() {
    this.author.updateTotalInfo(this.firstLastCommit.maxData);
    this.team.updateTotalInfo(this.author);
    this.scope.updateTotalInfo();
    this.type.updateTotalInfo();
    this.timestamp.updateTotalInfo(this.author);
    this.month.updateTotalInfo(this.author);
    this.week.updateTotalInfo(this.author);
    this.recommendations.updateTotalInfo(this);
    this.tasks.updateTotalInfo();
    this.taskNumbersDate.updateTotalInfo(this.tasks);
    this.pr.updateTotalInfo(this.tasks, this.author);
    this.release.updateTotalInfo(this.tasks, this.pr);
    this.scoring.updateTotalInfo(this.author, this.timestamp);
    this.company.updateTotalInfo(this.author);
    this.country.updateTotalInfo(this.author);
    this.taskCodes.updateTotalInfo(this.firstLastCommit.maxData, this.author);
    this.taskNumbers.updateTotalInfo();
  }
}

const dataGrip = new DataGrip();

export default dataGrip;
