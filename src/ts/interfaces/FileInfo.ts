import ICommit, { ISystemCommit } from './Commit';
import IHashMap from './HashMap';

interface IFileStat {
  lines: number; // 38, line in file for this moment

  addedLines: number;
  removedLines: number;
  changedLines: number;

  addedLinesByAuthor: IHashMap<number>; // added lines by author
  removedLinesByAuthor: IHashMap<number>; // removed lines by author
  changedLinesByAuthor: IHashMap<number>; // removed lines by author

  addedByAuthorInPercent: IHashMap<number>;
  removedByAuthorInPercent: IHashMap<number>;
  changedByAuthorInPercent: IHashMap<number>;

  firstCommit: ICommit | ISystemCommit | null,
  lastCommit: ICommit | ISystemCommit | null,
}

export interface IDirtyFile extends IFileStat {
  id: string; // "src/mynewlogo.test.ts",
  path: string[]; // ['src']
  pathString: string; // 'src/MyNewLogo.test.ts'
  name: string; // "MyNewLogo.test.ts",
  extension: string; // "ts",
  type: string; // "test",
  action: string; // 'A' or 'M' or 'D'
}

export interface IFolder extends IFileStat {
  id?: number;
  name?: string;
  path: string[]; // ['src']
  pathString: string; // 'src\\ts'
  content: IHashMap<IDirtyFile>,
}
