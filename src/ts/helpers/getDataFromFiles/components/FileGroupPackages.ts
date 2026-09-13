import { SourceDataPackage } from 'ts/interfaces/SourceData';

import FileWithData from '../interfaces';

function isPackageFileName(name?: string) {
  return name === 'packages.json'
    || name === 'package.json'
    || Boolean(name?.endsWith('/package.json'));
}

function isPackageRecord(item: any) {
  return Boolean(item?.name && item?.version && !item?.lockfileVersion);
}

export default class FileGroupPackages {
  content: SourceDataPackage[] = [];

  length: number = 0;

  clear() {
    this.content = [];
  }

  is(file: FileWithData) {
    if (isPackageFileName(file.name)) return true;
    if (Array.isArray(file.content)) return isPackageRecord(file.content[0]);
    return isPackageRecord(file.content);
  }

  add(file: any) {
    if (Array.isArray(file.content)) {
      this.content = this.content.concat(file.content);
      this.length += 1;
      return;
    }
    if (isPackageRecord(file.content)) {
      this.content.push(file.content);
      this.length += 1;
    }
  }

  get() {
    return this.content;
  }
}
