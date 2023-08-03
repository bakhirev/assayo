import { makeObservable, observable, action } from 'mobx';

import ICommit from 'ts/interfaces/Commit';
import { IDirtyFile, IFileTree } from 'ts/interfaces/FileInfo';
import achievements from 'ts/helpers/achievement/byCompetition';
import dataGrip from 'ts/helpers/DataGrip';
import getFileTreeWithStatistic from 'ts/helpers/DataGrip/helpers/tree';
import Parser from 'ts/helpers/Parser';
import ParserTelegramm from 'ts/helpers/ParserTelegramm';
import { setDefaultValues } from 'ts/pages/Settings/helpers/getEmptySettings';

import settingsStore from './Settings';

interface IDataGripStore {
  commits: ICommit[];
  dataGrip: any;
  showApplication: boolean;
  setCommits: (log?: string[]) => void;
}

class DataGripStore implements IDataGripStore {
  commits: any[] = [];

  fileList: IDirtyFile[] = [];

  fileTree: IFileTree = {} as IFileTree;

  dataGrip: any = null;

  showApplication: boolean = false;

  constructor() {
    makeObservable(this, {
      commits: observable,
      dataGrip: observable,
      showApplication: observable,
      setCommits: action,
      setTelegrammMessages: action,
    });
  }

  setCommits(dump?: string[], type?: string) {
    dataGrip.clear();
    const parser = type === 'telegramm'
      ? ParserTelegramm
      : Parser;

    const {
      commits,
      fileList,
      fileTree,
    } = parser(dump || [], (commit: ICommit) => dataGrip.addCommit(commit));

    this.commits = commits;
    this.fileList = fileList;
    this.fileTree = getFileTreeWithStatistic(fileTree);

    this.showApplication = !!this.commits.length;// && !!dataGrip.author.list.length;
    if (this.showApplication) {
      setDefaultValues(dataGrip.firstLastCommit.minData, dataGrip.firstLastCommit.maxData);
      settingsStore.updateByCommits(
        this.commits,
        dataGrip.firstLastCommit.minData,
        dataGrip.firstLastCommit.maxData,
      );

      dataGrip.updateByInitialization();
      dataGrip.updateByFiles(fileList);
      achievements.updateByDataGrip(dataGrip.author.statistic);
    }

    this.dataGrip = null;
    this.dataGrip = dataGrip;
    console.dir(dataGrip);
  }

  setTelegrammMessages(dump?: any[]) {
    return this.setCommits(dump, 'telegramm');
  }

  updateChars() { // todo: remove, never use
    console.log('need update data TODO');
    return;
    dataGrip.updateByFilters();
    if (!dataGrip.author.list.length) return;
    achievements.updateByDataGrip(dataGrip.author.statistic);
    this.dataGrip = null;
    this.dataGrip = dataGrip;
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
