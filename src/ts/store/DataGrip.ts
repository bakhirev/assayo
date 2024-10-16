import { action, makeObservable, observable } from 'mobx';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import achievements from 'ts/helpers/achievement/byCompetition';
import dataGrip from 'ts/helpers/DataGrip';
import fileGrip from 'ts/helpers/FileGrip';
import Parser from 'ts/helpers/Parser';
import getTitle from 'ts/helpers/Title';

import { setDefaultValues } from 'ts/pages/Settings/helpers/getEmptySettings';
import splashScreenStore from 'ts/components/SplashScreen/store';
import { applicationHasCustom } from 'ts/helpers/RPC';
import Depersonalized from 'ts/helpers/Depersonalized';

// import userSettingsStore from './UserSettings';
import filtersInHeaderStore from './FiltersInHeader';
import viewNameStore, { ViewNameEnum } from './ViewName';

const PROCESSING_DELAY = 300;

class DataGripStore {
  commits: any[] = [];

  dataGrip: any = null;

  fileGrip: any = null;

  hash: number = 0;

  isDepersonalized: boolean = false;

  constructor() {
    makeObservable(this, {
      dataGrip: observable,
      fileGrip: observable,
      hash: observable,
      isDepersonalized: observable,
      asyncSetCommits: action,
      processingStringToCommit: action,
      processingDataAnalysis: action,
      depersonalized: action,
      updateStatistic: action,
    });
  }

  asyncSetCommits(dump?: string[]) {
    if (!dump?.length) return;
    splashScreenStore.show();
    setTimeout(() => this.processingStringToCommit(dump), PROCESSING_DELAY);
  }

  processingStringToCommit(dump?: string[]) {
    dataGrip.clear();
    fileGrip.clear();

    const commits = Parser(dump || []);
    if (!commits.length) {
      splashScreenStore.hide();
      return;
    }

    setTimeout(() => this.processingCommitGrouping(commits), PROCESSING_DELAY);
  }

  processingCommitGrouping(commits: (ICommit | ISystemCommit)[]) {
    commits.sort((a, b) => a.milliseconds - b.milliseconds);
    commits.forEach((commit: ICommit | ISystemCommit) => {
      dataGrip.addCommit(commit);
      fileGrip.addCommit(commit);
    });

    setTimeout(() => this.processingDataAnalysis(commits), PROCESSING_DELAY);
  }

  processingDataAnalysis(commits: (ICommit | ISystemCommit)[]) {
    fileGrip.updateTotalInfo();
    this.commits = commits;

    filtersInHeaderStore.updateByCommits(
      dataGrip.firstLastCommit.minData,
      dataGrip.firstLastCommit.maxData,
    );
    setDefaultValues(dataGrip.firstLastCommit.minData, dataGrip.firstLastCommit.maxData);

    dataGrip.updateTotalInfo();
    achievements.updateByGrip(dataGrip, fileGrip);

    viewNameStore.toggle(ViewNameEnum.INFO);
    this.#updateRender();

    console.dir(this.dataGrip);
    console.dir(this.fileGrip);
    if (!applicationHasCustom.title) {
      document.title = getTitle(this.dataGrip, this.fileGrip, this.commits);
    }
  }

  depersonalized(status?: boolean) {
    this.isDepersonalized = !!status;
    setTimeout(() => {
      this.updateStatistic();
    }, 100);
  }

  updateStatistic() {
    dataGrip.clear();
    fileGrip.clear();

    // const message = userSettingsStore.settings?.commitFilters?.message || '';
    // const messageCheck = message ? new RegExp(message) : null;

    const depersonalized = new Depersonalized();
    this.commits.forEach((commit: ICommit | ISystemCommit) => {
      if (commit.timestamp < filtersInHeaderStore.from
        || commit.timestamp > filtersInHeaderStore.to) return;

      // if (messageCheck && messageCheck.test(commit.message || '')) return;

      const localCommit = this.isDepersonalized
        ? depersonalized.getCommit(commit)
        : commit;

      dataGrip.addCommit(localCommit);
      fileGrip.addCommit(localCommit);
    });

    fileGrip.updateTotalInfo();
    dataGrip.updateTotalInfo();
    achievements.updateByGrip(dataGrip, fileGrip);
    this.#updateRender();
  }

  #updateRender() {
    this.dataGrip = null;
    this.dataGrip = dataGrip;
    this.fileGrip = null;
    this.fileGrip = fileGrip;
    this.hash = Math.random();
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
