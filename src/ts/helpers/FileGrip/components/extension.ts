import { HashMap } from 'ts/interfaces/HashMap';
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

  statisticByName: HashMap<IStatByExtension> = new Map();

  property: string = '';

  constructor(property?: string) {
    this.property = property || 'extension';
  }

  clear() {
    this.statistic = [];
    this.statisticByName.clear();
  }

  addFile(file: IDirtyFile) {
    const key = file?.extension;

    if (!key || IGNORE_LIST.includes(file.name)) return;

    let extension = this.statisticByName.get(key);
    if (!extension) {
      extension = this.#getNewExtension(file);
      this.statisticByName.set(key, extension);
    }

    if (file.action === 'D') {
      extension.removedFiles.push(file);
      extension.removedCount += 1;
    } else {
      extension.files.push(file);
      extension.count += 1;
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
    this.statistic = Array.from(this.statisticByName.values())
      .sort((a: any, b: any) => b.count - a.count);
  }
}
