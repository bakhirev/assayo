import { makeObservable, observable, action } from 'mobx';

import { ISourceData } from 'ts/interfaces/SourceData';

class SourceData {
  data: ISourceData = {};

  hash: number = 0;

  constructor() {
    makeObservable(this, {
      hash: observable,
      add: action,
    });
  }

  add(key: string, data: any) {
    this.data[key] = data;
    this.hash = Math.random();
  }

  addGroups(groups: any) {
    for (let key in groups) {
      this.data[key] = groups[key];
    }
    this.hash = Math.random();
  }

  get(key: string) {
    return this.data[key] || undefined;
  }

  has(key: string) {
    const value = this.data[key];
    return Array.isArray(value) ? value.length > 0 : !!value;
  }
}

const sourceData = new SourceData();

sourceData.add('commits', []); // @ts-ignore
sourceData.add('gitLog', window.report || []);
console.log(sourceData);

export default sourceData;
