import { makeObservable, observable, action } from 'mobx';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';
import { IDirtyFile, IFileTree } from 'ts/interfaces/FileInfo';
import achievements from 'ts/helpers/achievement/byCompetition';
import dataGrip from 'ts/helpers/DataGrip';
import getFileTreeWithStatistic from 'ts/helpers/DataGrip/helpers/tree';
import Parser from 'ts/helpers/Parser';
import { setDefaultValues } from 'ts/pages/Settings/helpers/getEmptySettings';
import getTitle from 'ts/helpers/Title';
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
  status: DataParseStatusEnum;
  setCommits: (log?: string[]) => void;
}

class DataGripStore implements IDataGripStore {
  commits: any[] = [];

  fileList: IDirtyFile[] = [];

  fileTree: IFileTree = {} as IFileTree;

  removedFileList: IDirtyFile[] = [];

  removedFileTree: IFileTree = {} as IFileTree;

  dataGrip: any = null;

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
    const parser = Parser;

    const {
      commits,
      fileList,
      fileTree,
      removed,
    } = parser(dump || []);

    commits.sort((a, b) => a.milliseconds - b.milliseconds);
    commits.forEach((commit: ICommit | ISystemCommit) => {
      dataGrip.addCommit(commit);
    });

    this.commits = commits;
    this.fileList = fileList;
    this.fileTree = getFileTreeWithStatistic(fileTree);
    this.removedFileList = removed.fileList;
    this.removedFileTree = getFileTreeWithStatistic(removed.fileTree);

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
      dataGrip.updateByFiles(fileList, removed.fileList);
      achievements.updateByDataGrip(dataGrip);
    }

    this.dataGrip = null;
    this.dataGrip = dataGrip;

    console.dir(this.dataGrip);
    if (!applicationHasCustom.title) {
      document.title = getTitle(this.dataGrip, this.commits);
    }
  }

  updateChars() { // todo: remove, never use
    console.log('need update data TODO');
    dataGrip.updateByFilters();
    if (!dataGrip.author.list.length) return;
    achievements.updateByDataGrip(dataGrip);
    this.dataGrip = null;
    this.dataGrip = dataGrip;
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
