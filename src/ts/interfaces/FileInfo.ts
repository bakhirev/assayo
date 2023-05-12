import ICommit from './Commit';
import IHashMap from './HashMap';

export interface IDirtyFile {
  name: string; // ".gitignore",
  lines: number; // 38, line in file for this moment
  created: ICommit,
  path: string[],
  authors: {
    [author: string]: {
      added: number; // 38,
      changes: number; // 38,
      removed: number; // 0,
      commits: number; // 1,
      tasks: {
        [taskName: string]: number,
      },
      types: {
        [typeName: string]: number,
      },
      scopes: {
        [scopeName: string]: number,
      }
    }
  }
}

export interface IFileTree {
  id?: number;
  name?: string;
  content: IHashMap<IDirtyFile>,
}
