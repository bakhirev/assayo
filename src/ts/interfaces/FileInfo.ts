import IHashMap, { HashMap } from './HashMap';

interface IFileStat {
  lines: number; // 38, line in file for this moment
  commitsByAuthor: HashMap<number>; // { alex: 123 }

  commits: number; // 1
  firstCommit: number; // 1771406888647
  lastCommit: number; // 1771406888647

  createAuthor: string; // "alex"
  createYear: number; // 1999

  tasks: string[]; // ["JIRA-123"]
  totalTasks: number; // 1

  days: string[]; // ["2022-01-01"]
  totalDays: number; // 1
  money: number; // 123

  // фильтры поиска
  authors: IHashMap<number>;
  companies: IHashMap<number>;
  types: IHashMap<number>;
  scope: IHashMap<number>;
  taskCode: IHashMap<number>;

  addedLines: number;
  removedLines: number;
  changedLines: number;

  addedLinesByAuthor: IHashMap<number>; // added lines by author
  removedLinesByAuthor: IHashMap<number>; // removed lines by author
  changedLinesByAuthor: IHashMap<number>; // removed lines by author
}

export interface IDirtyFile extends IFileStat {
  id: string; // "src/mynewlogo.test.ts",
  name: string; // "MyNewLogo.test.ts",
  path: string[]; // ['src']
  pathString: string; // 'src/MyNewLogo.test.ts'

  extension: string; // "ts",
  type: string; // "test",
  action: string; // 'A' or 'M' or 'D'

  daysByAuthor: HashMap<Set<string>>; // { alex: ["2022-01-01"] }
}

export interface IFolder extends IFileStat {
  id?: number;
  name?: string;
  path: string[]; // ['src']
  pathString: string; // 'src\\ts'

  content: HashMap<IDirtyFile>,
}
