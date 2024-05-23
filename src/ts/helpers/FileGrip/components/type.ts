import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

export default class FileGripByType {
  statistic: any = [];

  statisticByName: IHashMap<any> = {};

  clear() {
    this.statistic = [];
    this.statisticByName = {};
  }

  addFile(file: IDirtyFile) {
    const key = file?.type;

    if (!key || file?.name?.[0] === '.') return;

    if (!this.statisticByName[key]) {
      this.statisticByName[key] = this.#getNewType(file);
    }

    const type = this.statisticByName[key];
    type.extension[file?.extension] = type.extension[file?.extension]
      ? (type.extension[file?.extension] + 1)
      : 1;

    if (file.action === 'D') {
      type.removedFiles.push(file);
      type.removedCount += 1;
    } else {
      type.files.push(file);
      type.count += 1;
    }
  }

  #getNewType(file: IDirtyFile) {
    return {
      type: file?.type,
      task: file?.firstCommit?.task,
      path: file?.name,
      extension: { [file?.extension]: 1 },
      files: [],
      count: 0,
      removedFiles: [],
      removedCount: 0,
    };
  }

  updateTotalInfo() {
    this.statistic = Object.entries(this.statisticByName)
      .sort((a: any, b: any) => b[1].count - a[1].count)
      .map((item: any) => item[1]);
  }
}
