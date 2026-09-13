import { SourceDataDependency, SourceDataDependencies } from 'ts/interfaces/SourceData';

import FileWithData from '../interfaces';

function isDependencyRecord(item: any): item is SourceDataDependency {
  return Boolean(item && typeof item === 'object' && item.package);
}

export default class FileGroupDependencies {
  content: SourceDataDependencies = {};

  length: number = 0;

  clear() {
    this.content = {};
  }

  is(file: FileWithData) {
    if (file.name === 'dependencies.json') return true;
    const content = file.content;
    if (!content || typeof content !== 'object' || Array.isArray(content)) return false;
    const first = Object.values(content as object)[0];
    return isDependencyRecord(first);
  }

  add(file: any) {
    if (!file?.content || typeof file.content !== 'object' || Array.isArray(file.content)) return;
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
