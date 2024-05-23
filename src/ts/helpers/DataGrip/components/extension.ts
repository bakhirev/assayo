import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

const IGNORE_LIST = [
  '.eslintrc',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
];

export default class DataGripByExtension {
  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.statistic = [];
    this.statisticByName = {};
  }

  updateTotalInfo(fileList: IDirtyFile[], removedFileList: IDirtyFile[]) {
    const byExtension = {};

    fileList.forEach((file: any) => {
      this.#updateStatistic(file, byExtension, 'current');
    });

    removedFileList.forEach((file: any) => {
      this.#updateStatistic(file, byExtension, 'removed');
    });

    this.statistic = Object.entries(byExtension)
      .sort((a: any, b: any) => b[1].current.count - a[1].current.count)
      .map((item: any) => {
        if (item[1].removed.count !== 1 && item[1].current.count !== 1) {
          item[1].path = null;
        }
        return item[1];
      });

    this.statisticByName = byExtension;
  }

  #updateStatistic(
    file: IDirtyFile,
    group: Record<string, any>,
    type: 'current' | 'removed',
  ) {
    if (!file.extension
      || IGNORE_LIST.includes(file.name)) return;

    if (!group[file.extension]) {
      group[file.extension] = this.#getNewExtension(file);
    }
    group[file.extension][type].files[file.id] = file.name;
    group[file.extension][type].count += 1;
  }

  #getNewExtension(file: IDirtyFile) {
    return {
      extension: file?.extension,
      authors: {},
      task: file?.firstCommit?.task,
      path: file?.name,
      current: {
        files: {},
        count: 0,
      },
      removed: {
        files: {},
        count: 0,
      },
    };
  }
}
