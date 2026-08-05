import { SourceDataDependency, SourceDataDependencies } from 'ts/interfaces/SourceData';

import FileWithData from '../interfaces';

export default class FileGroupGitLog {
  content: SourceDataDependency[] = [];

  length: number = 0;

  clear() {
    this.content = [];
  }

  is(file: FileWithData) {
    if (file.name === 'dependencies.json') return true;
    if (typeof file.content !== 'object') return false;
    return Object.entries(file.content as object)[0][1].package;
  }

  add(file: any) {
    this.content = {
      ...this.content,
      ...file.content as SourceDataDependencies,
    };
    this.length += 1;
  }

  get() {
    return this.content;
  }
}
