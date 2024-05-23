import { makeObservable, observable, action } from 'mobx';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import achievements from 'ts/helpers/achievement/byCompetition';
import dataGrip from 'ts/helpers/DataGrip';
import fileGrip from 'ts/helpers/FileGrip';
import Parser from 'ts/helpers/Parser';
import getTitle from 'ts/helpers/Title';

import { setDefaultValues } from 'ts/pages/Settings/helpers/getEmptySettings';
import { applicationHasCustom } from 'ts/helpers/RPC';

import settingsStore from './Settings';

export enum DataParseStatusEnum {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  DONE = 'done',
}

interface IDataGripStore {
  commits: ICommit[];
  dataGrip: any;
  fileGrip: any;
  status: DataParseStatusEnum;
  setCommits: (log?: string[]) => void;
}

class DataGripStore implements IDataGripStore {
  commits: any[] = [];

  dataGrip: any = null;

  fileGrip: any = null;

  status: DataParseStatusEnum = DataParseStatusEnum.PROCESSING;

  constructor() {
    makeObservable(this, {
      commits: observable,
      dataGrip: observable,
      status: observable,
      setCommits: action,
    });
  }

  setCommits(dump?: string[]) {
    dataGrip.clear();
    fileGrip.clear();

    const commits = Parser(dump || []);

    commits.sort((a, b) => a.milliseconds - b.milliseconds);
    commits.forEach((commit: ICommit | ISystemCommit) => {
      dataGrip.addCommit(commit);
      fileGrip.addCommit(commit);
    });
    fileGrip.updateTotalInfo();

    this.commits = commits;

    this.status = this.commits.length
      ? DataParseStatusEnum.DONE
      : DataParseStatusEnum.WAITING;

    if (this.status === DataParseStatusEnum.DONE) {
      setDefaultValues(dataGrip.firstLastCommit.minData, dataGrip.firstLastCommit.maxData);
      settingsStore.updateByCommits(
        this.commits,
        dataGrip.firstLastCommit.minData,
        dataGrip.firstLastCommit.maxData,
      );

      dataGrip.updateByInitialization();
      achievements.updateByGrip(dataGrip, fileGrip);
    }

    this.dataGrip = null;
    this.dataGrip = dataGrip;
    this.fileGrip = fileGrip;

    console.dir(this.dataGrip);
    console.dir(this.fileGrip);
    if (!applicationHasCustom.title) {
      document.title = getTitle(this.dataGrip, this.fileGrip, this.commits);
    }
  }

  updateChars() { // todo: remove, never use
    console.log('need update data TODO');
    dataGrip.updateByFilters();
    if (!dataGrip.author.list.length) return;
    achievements.updateByGrip(dataGrip, fileGrip);
    this.dataGrip = null;
    this.dataGrip = dataGrip;
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
