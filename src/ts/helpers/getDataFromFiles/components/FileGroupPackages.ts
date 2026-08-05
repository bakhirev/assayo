import { SourceDataPackage } from 'ts/interfaces/SourceData';

import FileWithData from '../interfaces';

export default class FileGroupPackages {
  content: SourceDataPackage[] = [];

  length: number = 0;

  clear() {
    this.content = [];
  }

  is(file: FileWithData) {
    if (file.name === 'packages.json') return true;
    const firstElement = file.content?.[0]; // @ts-ignore
    return firstElement?.name && firstElement?.version;
  }

  add(file: any) {
    if (Array.isArray(file.content)) {
      this.content = this.content.concat(file.content);
      this.length += 1;
    }
  }

  get() {
    return this.content;
  }
}
