import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

const IGNORE_LIST = [
  '.eslintrc',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
];

export interface StatisticsExtensionFiles {
  files: IHashMap<string>;
  count: number;
}

export interface StatisticsExtension {
  extension: string;
  authors: IHashMap<string>;
  task?: string;
  path: string | null;
  current: StatisticsExtensionFiles;
  removed: StatisticsExtensionFiles;
}

export default class StatisticsByExtension {
  totalInfo: StatisticsExtension[] = [];

  totalInfoByName: IHashMap<StatisticsExtension> = {};

  clear() {
    this.totalInfo = [];
    this.totalInfoByName = {};
  }

  updateTotalInfo(fileList: IDirtyFile[], removedFileList: IDirtyFile[]) {
    const refExtensionStatistic: IHashMap<StatisticsExtension> = {};

    fileList.forEach((file: IDirtyFile) => {
      this.#updateStatistic(file, refExtensionStatistic, 'current');
    });

    removedFileList.forEach((file: IDirtyFile) => {
      this.#updateStatistic(file, refExtensionStatistic, 'removed');
    });

    this.totalInfo = Object.entries(refExtensionStatistic)
      .sort((a, b) => b[1].current.count - a[1].current.count)
      .map((item) => {
        if (item[1].removed.count !== 1 && item[1].current.count !== 1) {
          item[1].path = null;
        }
        return item[1];
      });

    this.totalInfoByName = refExtensionStatistic;
  }

  #updateStatistic(
    file: IDirtyFile,
    group: IHashMap<StatisticsExtension>,
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

  #getNewExtension(file: IDirtyFile): StatisticsExtension {
    return {
      extension: file?.extension,
      authors: {},
      task: file?.tasks?.[0],
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
