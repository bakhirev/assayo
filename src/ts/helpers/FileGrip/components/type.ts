import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import { increment } from 'ts/helpers/Math';

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

  statisticByName: HashMap<IStatByType> = new Map();

  clear() {
    this.statistic = [];
    this.statisticByName.clear();
  }

  addFile(file: IDirtyFile) {
    const key = file?.type;

    if (!key || file?.name?.[0] === '.') return;

    let type = this.statisticByName.get(key);
    if (!type) {
      type = this.#getNewType(file);
      this.statisticByName.set(key, type);
    }

    increment(type.extension, file?.extension);

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
      extension: {},
      files: [],
      count: 0,
      removedFiles: [],
      removedCount: 0,
    };
  }

  updateTotalInfo() {
    this.statistic = Array.from(this.statisticByName.values())
      .filter((data: any) => data.type.indexOf('#') === -1)
      .sort((a: any, b: any) => b.count - a.count);
  }
}
