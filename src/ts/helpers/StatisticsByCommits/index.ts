import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import Recommendations from 'ts/helpers/Recommendations';

import StatisticsByAuthor from './components/author';
import StatisticsByTeam from './components/team';
import StatisticsByScope from './components/scope/index';
import StatisticsByType from './components/type';
import StatisticsByTimestamp from './components/timestamp';
import StatisticsByMonth from './components/month';
import StatisticsByWeek from './components/week';
import MinMaxCounter from './helpers/MinMaxCounter';
import StatisticsByGet from './components/get';
import StatisticsByPR from './components/pr';
import StatisticsByTasks from './components/tasks';
import StatisticsByRelease from './components/release';
import StatisticsByScoring from './components/scoring';
import StatisticsByTaskCodes from './components/taskCodes';
import StatisticsByTaskNumbersDate from './components/taskNumbersDate';
import StatisticsByCompany from './components/company';
import StatisticsByCountry from './components/country';
import StatisticsByAbsence from './components/absence';
import StatisticsByServer from './components/server';
import StatisticsByService from './components/service';
import StatisticsByEmail from './components/email';

class StatisticsByCommits {
  firstLastCommit: any = new MinMaxCounter();

  author: any = new StatisticsByAuthor();

  company: any = new StatisticsByCompany();

  country: any = new StatisticsByCountry();

  team: any = new StatisticsByTeam();

  scope: any = new StatisticsByScope();

  type: any = new StatisticsByType();

  timestamp: any = new StatisticsByTimestamp(); // deprecated

  month: any = new StatisticsByMonth();

  week: any = new StatisticsByWeek();

  recommendations: any = new Recommendations();

  get: any = new StatisticsByGet();

  pr: any = new StatisticsByPR();

  tasks: any = new StatisticsByTasks();

  release: any = new StatisticsByRelease();

  scoring: any = new StatisticsByScoring();

  taskCodes: any = new StatisticsByTaskCodes();

  taskNumbersDate: any = new StatisticsByTaskNumbersDate();

  absence: any = new StatisticsByAbsence();

  server: any = new StatisticsByServer();

  service: any = new StatisticsByService();

  email: any = new StatisticsByEmail();

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
    this.taskNumbersDate.clear();
    this.absence.clear();
    this.server.clear();
    this.service.clear();
    this.email.clear();
  }

  addCommit(commit: ICommit | ISystemCommit, totalCommits: number) {
    this.server.addCommit(commit);
    if (commit.author === 'GitHub') return;
    this.pr.addCommit(commit); // @ts-ignore
    this.release.addCommit(commit); // @ts-ignore
    if (!commit.commitType) {
      this.firstLastCommit.update(commit.milliseconds, commit);
      this.author.addCommit(commit, totalCommits);
      this.company.addCommit(commit);
      this.scope.addCommit(commit);
      this.type.addCommit(commit);
      this.timestamp.addCommit(commit);
      this.month.addCommit(commit);
      this.get.addCommit(commit);
      this.week.addCommit(commit);
      this.tasks.addCommit(commit);
      this.taskCodes.addCommit(commit);
      this.taskNumbersDate.addCommit(commit);
      this.absence.addCommit(commit);
      this.email.addCommit(commit);
    } else {
      this.service.addCommit(commit);
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
    this.pr.updateTotalInfo(this.tasks);
    this.release.updateTotalInfo(this.tasks, this.pr);
    this.tasks.updateTotalInfo2();
    this.scoring.updateTotalInfo(this.author, this.timestamp);
    this.company.updateTotalInfo(this.firstLastCommit.maxData);
    this.country.updateTotalInfo(this.author);
    this.taskCodes.updateTotalInfo(this.author, this.firstLastCommit.maxData);
    this.absence.updateTotalInfo(this.author);
    this.server.updateTotalInfo();
    this.service.updateTotalInfo();
    this.email.updateTotalInfo(this.author);
  }
}

const statisticsByCommits = new StatisticsByCommits();

export default statisticsByCommits;
