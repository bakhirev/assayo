import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';
import settingsStore from 'ts/store/Settings';
import Recommendations from 'ts/helpers/Recommendations';

import DataGripByAuthor from './components/author';
import DataGripByTeam from './components/team';
import DataGripByScope from './components/scope';
import DataGripByType from './components/type';
import DataGripByTimestamp from './components/timestamp';
import DataGripByWeek from './components/week';
import MinMaxCounter from './components/counter';
import DataGripByExtension from './components/extension';
import DataGripByPR from './components/pr';

class DataGrip {
  firstLastCommit: any = new MinMaxCounter();

  author: any = new DataGripByAuthor();

  team: any = new DataGripByTeam();

  scope: any = new DataGripByScope();

  type: any = new DataGripByType();

  timestamp: any = new DataGripByTimestamp();

  week: any = new DataGripByWeek();

  recommendations: any = new Recommendations();

  extension: any = new DataGripByExtension();

  pr: any = new DataGripByPR();

  initializationInfo: any = {};

  clear() {
    this.firstLastCommit.clear();
    this.author.clear();
    this.team.clear();
    this.scope.clear();
    this.type.clear();
    this.timestamp.clear();
    this.week.clear();
    this.recommendations.clear();
    this.extension.clear();
    this.pr.clear();
  }

  addCommit(commit: ICommit | ISystemCommit) {
    if (commit.author === 'GitHub') return; // @ts-ignore
    if (commit.commitType) {
      this.pr.addCommit(commit);
    } else {
      this.firstLastCommit.update(commit.milliseconds, commit);
      this.author.addCommit(commit);
      this.scope.addCommit(commit);
      this.type.addCommit(commit);
      this.timestamp.addCommit(commit);
      this.week.addCommit(commit);
    }
  }

  #updateTotalInfo() {
    this.author.updateTotalInfo();
    this.team.updateTotalInfo(this.author);
    this.scope.updateTotalInfo();
    this.type.updateTotalInfo();
    this.timestamp.updateTotalInfo(this.author);
    this.week.updateTotalInfo(this.author);
    this.recommendations.updateTotalInfo(this);
    this.pr.updateTotalInfo(this);
  }

  updateByInitialization() {
    this.#updateTotalInfo();
    this.initializationInfo = this.author.statistic
      .reduce((info: any, author: any) => {
        info[author.author] = { ...author };
        return info;
      }, {});
  }

  updateByFilters() {
    this.clear();
    settingsStore.commits.forEach((commit: ICommit) => {
      const author = this.initializationInfo[commit.author] || { commits: 0 };
      if (commit.timestamp < settingsStore.from
        || commit.timestamp > settingsStore.to
        || author.commits < settingsStore.minCommits) return;
      this.addCommit(commit);
    });
    this.#updateTotalInfo();
  }

  updateByFiles(fileList: any[]) {
    this.extension.updateTotalInfo(fileList, this.author);
  }
}

const dataGrip = new DataGrip();

export default dataGrip;
