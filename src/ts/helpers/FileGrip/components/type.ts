import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

interface IStatByType {
  type: string;  // type name
  task?: string; // first file with this type was created in task
  path: string;  // first file with this type has path,
  extension: IHashMap<number>; // the number of extensions with this type
  files: IDirtyFile[], // all files with this type
  count: number, // TODO: remove?
  removedFiles: IDirtyFile[], // all removed files with this type
  removedCount: number, // TODO: remove?
}

export default class FileGripByType {
  statistic: IStatByType[] = [];

  statisticByName: IHashMap<IStatByType> = {};

  clear() {
    this.statistic = [];
    this.statisticByName = {};
  }

  addFile(file: IDirtyFile) {
    const key = file?.type;

    if (!key || file?.name?.[0] === '.') return;

    if (!this.statisticByName.hasOwnProperty(key)) {
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

  #getNewType(file: IDirtyFile): IStatByType {
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
