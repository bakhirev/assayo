import { SourceDataGitLog } from 'ts/interfaces/SourceData';

import FileWithData from '../interfaces';

export default class FileGroupGitLog {
  content: SourceDataGitLog = [];

  length: number = 0;

  clear() {
    this.content = [];
  }

  is() {
    return true;
  }

  add(file: FileWithData) {
    this.content.push(file.content as string);
    this.length += 1;
  }

  get() {
    if (this.content.length === 0) return [];
    return this.content
      .map((item: string) => ({ key: item.substring(13, 32), text: item }))
      .sort((a: any, b: any) => (a.key || '').localeCompare(b.key || ''))
      .map(item => item.text)
      .join('\n')
      .split('\n');
  }
}
