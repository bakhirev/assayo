import { HashMap } from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

interface StatByType {
  type: string;  // type name
  task?: string; // first file with this type was created in task
  path?: string;  // first file with this type has path,
  files: number, // all files with this type
  removedFiles: number, // all removed files with this type
}

export default class FileGripByType {
  commits: HashMap<StatByType> = new Map();

  totalInfo: StatByType[] = [];

  clear() {
    this.totalInfo = [];
    this.commits.clear();
  }

  addFile(file: IDirtyFile) {
    if (!file?.type || file?.name?.[0] === '.') return;
    const statistic = this.commits.get(file?.type);
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
    this.commits.set(file?.type, {
      type: file?.type,
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

