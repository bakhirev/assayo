import { HashMap } from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

interface StatByExtension {
  extension: string;  // extension name
  task?: string; // first file with this type was created in task
  path?: string;  // first file with this type has path,
  files: number, // all files with this type
  removedFiles: number, // all removed files with this type
}

const IGNORE_LIST = new Set([
  '.eslintrc',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
]);

export default class FileGripByExtension {
  commits: HashMap<StatByExtension> = new Map();

  totalInfo: StatByExtension[] = [];

  clear() {
    this.totalInfo = [];
    this.commits.clear();
  }

  addFile(file: IDirtyFile) {
    if (!file?.extension || IGNORE_LIST.has(file.name)) return;
    const statistic = this.commits.get(file?.extension);
    if (statistic) {
      this.#updateFile(statistic, file);
    } else {
      this.#addNewFile(file);
    }
  }

  #updateFile(statistic: any, file: IDirtyFile) {
    if (file.action === 'D') {
      statistic.removedFiles += 1;
    } else {
      statistic.files += 1;
    }
  }

  #addNewFile(file: IDirtyFile) {
    this.commits.set(file?.extension, {
      extension: file?.extension,
      task: file?.tasks?.[0],
      path: file?.name,
      files: file.action === 'D' ? 0 : 1,
      removedFiles: file.action === 'D' ? 1 : 0,
    });
  }

  updateTotalInfo() {
    this.totalInfo = Array.from(this.commits.values())
      .sort((a: any, b: any) => b.files - a.files);
    this.commits.clear();
  }
}
