import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

interface IStatByExtension {
  extension: string;  // extension name
  task?: string; // first file with this type was created in task
  path: string;  // first file with this type has path,
  files: IDirtyFile[], // all files with this type
  count: number, // TODO: remove?
  removedFiles: IDirtyFile[], // all removed files with this type
  removedCount: number, // TODO: remove?
}

const IGNORE_LIST = [
  '.eslintrc',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
];

export default class FileGripByExtension {
  statistic: IStatByExtension[] = [];

  statisticByName: IHashMap<IStatByExtension> = {};

  property: string = '';

  constructor(property?: string) {
    this.property = property || 'extension';
  }

  clear() {
    this.statistic = [];
    this.statisticByName = {};
  }

  addFile(file: IDirtyFile) {
    const key = file?.extension;

    if (!key || IGNORE_LIST.includes(file.name)) return;

    if (!this.statisticByName[key]) {
      this.statisticByName[key] = this.#getNewExtension(file);
    }

    const extensions = this.statisticByName[key];
    if (file.action === 'D') {
      extensions.removedFiles.push(file);
      extensions.removedCount += 1;
    } else {
      extensions.files.push(file);
      extensions.count += 1;
    }
  }

  #getNewExtension(file: IDirtyFile): IStatByExtension {
    return {
      extension: file?.extension,
      task: file?.firstCommit?.task,
      path: file?.name,
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
