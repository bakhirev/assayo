import { makeObservable, observable, action } from 'mobx';

import ICommit from 'ts/interfaces/Commit';
import { IDirtyFile, IFileTree } from 'ts/interfaces/FileInfo';
import achievements from 'ts/helpers/achievement/byCompetition';
import dataGrip from 'ts/helpers/DataGrip';
import getFileTreeWithStatistic from 'ts/helpers/DataGrip/helpers/tree';
import Parser from 'ts/helpers/Parser';
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
    });
  }

  setCommits(dump?: string[]) {
    dataGrip.clear();
    const {
      commits,
      fileList,
      fileTree,
    } = Parser(dump || [], (commit: ICommit) => dataGrip.addCommit(commit));

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
    }
    dataGrip.updateByInitialization();

    this.dataGrip = null;
    this.dataGrip = dataGrip;
    console.dir(dataGrip);
  }

  updateChars() {
    dataGrip.updateByFilters();
    if (!dataGrip.author.list.length) return;
    achievements.updateByDataGrip(dataGrip.author.statistic);
    this.dataGrip = null;
    this.dataGrip = dataGrip;
  }
}

const dataGripStore = new DataGripStore();

export default dataGripStore;
