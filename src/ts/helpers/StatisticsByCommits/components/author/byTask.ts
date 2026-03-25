import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';
import { getRemoveExtremeValuesFunc, WeightedAverage } from 'ts/helpers/Math';

import { createUniqValues, incrementUniqValues } from '../../helpers';

export default class StatisticsByTasks {
  commits: HashMap<any> = new Map();

  constructor(commit: ICommit) {
    this.addCommit(commit);
  }

  addCommit(commit: ICommit) {
    if (!commit.task) return;
    const statistic = this.commits.get(commit.task);
    if (statistic) {
      this.#updateCommit(statistic, commit);
    } else {
      this.#addNewCommit(commit);
    }
  }

  #updateCommit(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    incrementUniqValues(statistic.days, commit.timestamp);
    statistic.changes += commit.added + commit.changes - commit.removed;
    commit.fileChanges.forEach((item: IFileChange) => {
      statistic.files.add(item.id);
    });
  }

  #addNewCommit(commit: ICommit) {
    const fileIds = commit.fileChanges.map((item: IFileChange) => item.id);
    this.commits.set(commit.task, {
      commits: 1,
      days: createUniqValues(commit.timestamp),
      changes: commit.added + commit.changes - commit.removed,
      files: new Set(fileIds),
    });
  }

  getTotalInfo(totalDaysWithCommits: number) {
    const list = Array.from(this.commits.values());
    const totalTasks = list.length;
    const totalTaskInChanges = new WeightedAverage();
    const totalTaskInCommits = new WeightedAverage();
    const totalTaskInFiles = new WeightedAverage();

    list.forEach((item: any) => {
      totalTaskInChanges.update(item.changes);
      totalTaskInCommits.update(item.commits);
      totalTaskInFiles.update(item.files.size);
    });

    this.commits.clear();
    const removeExtremeValuesFunc = getRemoveExtremeValuesFunc(10, 'desc');

    return {
      totalTasks,
      totalTaskInDay: totalTasks / totalDaysWithCommits,
      totalTaskInChanges: totalTaskInChanges.get(),
      totalTaskInCommits: totalTaskInCommits.get(removeExtremeValuesFunc),
      totalTaskInFiles: totalTaskInFiles.get(removeExtremeValuesFunc),
    };
  }
}
