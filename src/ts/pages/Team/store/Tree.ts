import { makeObservable, observable, action } from 'mobx';

interface ITreeStore {
  hash: number;
  authorId: number;
  minCommits: number;
  selectedPath: string[];
  updateFilter: (property: string, value: any) => void;
}

class TreeStore implements ITreeStore {
  hash: number = 0;

  authorId: number = 0;

  minCommits: number = 0;

  selectedPath: string[] = [];

  constructor() {
    makeObservable(this, {
      hash: observable,
      authorId: observable,
      minCommits: observable,
      selectedPath: observable,
      updateFilter: action,
    });
  }

  updateFilter(property: string, value: any) {
    this[property] = value;
    this.hash = Math.random();
  }
}

const treeStore = new TreeStore();

export default treeStore;
