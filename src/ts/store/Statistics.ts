import { action, makeObservable, observable } from 'mobx';

import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';

import achievements from 'ts/helpers/achievement/byCompetition';
import statisticsByCommits from 'ts/helpers/StatisticsByCommits';
import statisticsByFiles from 'ts/helpers/StatisticsByFiles';
import getCommitObjectsFromText from 'ts/helpers/getCommitObjectsFromText';
import getTitle from 'ts/helpers/getTitle';

import { splashScreenStore } from 'ts/components/Layout';
import Depersonalized from 'ts/helpers/Depersonalized';

import filtersInHeaderStore from './FiltersInHeader';
import viewNameStore, { ViewNameEnum } from './ViewName';

const PROCESSING_DELAY = 300;

class StatisticsStore {
  commits: any[] = [];

  statisticsByCommits: any = null;

  statisticsByFiles: any = null;

  hash: number = 0;

  isDepersonalized: boolean = false;

  constructor() {
    makeObservable(this, {
      statisticsByCommits: observable,
      statisticsByFiles: observable,
      hash: observable,
      isDepersonalized: observable,
      asyncSetCommits: action,
      processingStringToCommit: action,
      processingDataAnalysis: action,
      depersonalized: action,
      updateStatistic: action,
      exit: action,
    });
  }

  asyncSetCommits(dump?: string[]) {
    if (!dump?.length) return;
    splashScreenStore.show();
    setTimeout(() => this.processingStringToCommit(dump), PROCESSING_DELAY);
  }

  processingStringToCommit(dump?: string[]) {
    statisticsByCommits.clear();
    statisticsByFiles.clear();

    const commits = getCommitObjectsFromText(dump || []);
    if (!commits.length) {
      splashScreenStore.hide();
      return;
    }

    setTimeout(() => this.processingCommitGrouping(commits), PROCESSING_DELAY);
  }

  processingCommitGrouping(commits: (ICommit | ISystemCommit)[]) {
    commits.sort((a, b) => a.milliseconds - b.milliseconds);

    const totalCommits = commits.length;
    commits.forEach((commit: ICommit | ISystemCommit) => {
      statisticsByCommits.addCommit(commit, totalCommits);
    });

    setTimeout(() => this.processingFileGrouping(commits), PROCESSING_DELAY);
  }

  processingFileGrouping(commits: (ICommit | ISystemCommit)[]) {
    commits.forEach((commit: ICommit | ISystemCommit) => {
      statisticsByFiles.addCommit(commit);
    });

    setTimeout(() => this.processingDataAnalysis(commits), PROCESSING_DELAY);
  }

  processingDataAnalysis(commits: (ICommit | ISystemCommit)[]) {
    statisticsByFiles.updateTotalInfo();
    this.commits = commits;

    filtersInHeaderStore.updateByCommits(
      statisticsByCommits.firstLastCommit.minData,
      statisticsByCommits.firstLastCommit.maxData,
    );

    statisticsByCommits.updateTotalInfo();
    achievements.updateByGrip(statisticsByCommits, statisticsByFiles);

    viewNameStore.toggle(ViewNameEnum.INFO);
    this.#updateRender();

    console.dir(this.statisticsByCommits);
    console.dir(this.statisticsByFiles);

    document.title = getTitle(this.statisticsByCommits, this.statisticsByFiles, this.commits);
  }

  depersonalized(status?: boolean) {
    this.isDepersonalized = !!status;
    setTimeout(() => {
      this.updateStatistic();
    }, 100);
  }

  updateStatistic() {
    statisticsByCommits.clear();
    statisticsByFiles.clear();

    const depersonalized = new Depersonalized();
    this.commits.forEach((commit: ICommit | ISystemCommit) => {
      if (commit.timestamp < filtersInHeaderStore.from
        || commit.timestamp > filtersInHeaderStore.to) return;

      const localCommit = this.isDepersonalized
        ? depersonalized.getDepersonalizedCommit(commit)
        : commit;

      statisticsByCommits.addCommit(localCommit, 0);
      statisticsByFiles.addCommit(localCommit);
    });

    statisticsByFiles.updateTotalInfo();
    statisticsByCommits.updateTotalInfo();
    achievements.updateByGrip(statisticsByCommits, statisticsByFiles);
    this.#updateRender();
  }

  #updateRender() {
    this.statisticsByCommits = null;
    this.statisticsByCommits = statisticsByCommits;
    this.statisticsByFiles = null;
    this.statisticsByFiles = statisticsByFiles;
    this.hash = Math.random();
  }

  exit() {
    statisticsByCommits.clear();
    statisticsByFiles.clear();
    this.commits = [];
    this.#updateRender();
  }
}

const statisticStore = new StatisticsStore();

export default statisticStore;
