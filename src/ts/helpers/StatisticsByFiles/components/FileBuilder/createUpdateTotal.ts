import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

function createMap(key?: string, value?: number) {
  return new Map(key ? [[key, value ?? 1]] : []);
}

function incrementMap(map: Map<string, number>, key?: string, value?: number) {
  if (!key) return;
  const prev = map.get(key) || 0;
  map.set(key, prev + (value ?? 1));
}

function createDirtyFile(fileChange: IFileChange, commit: ICommit): IDirtyFile {
  return {
    id: fileChange.id,
    name: '',
    path: fileChange.path,
    pathString: fileChange.path,
    extension: '',
    type: '',

    lines: 0,
    action: fileChange.action,

    commits: 1,
    firstCommit: commit.milliseconds,
    lastCommit: commit.milliseconds,

    // achievements
    createAuthor: commit.author,
    createYear: commit.year,

    // page: types, extensions
    tasks: new Set(commit.task ? [commit.task] : []),
    totalTasks: 0,

    days: new Set(commit.timestamp ? [commit.timestamp] : []),
    daysByAuthor: new Map([[commit.author, new Set([commit.timestamp])]]),
    totalDays: 0,
    money: 0,

    // page: files -> table: search filters
    authors: createMap(commit.author),
    companies: createMap(commit.company),
    types: createMap(commit.type),
    scope: createMap(commit.scope),
    taskCode: createMap(commit.taskCode),

    // page: files -> table: line charts
    addedLines: fileChange.addedLines,
    removedLines: fileChange.removedLines,
    changedLines: fileChange.changedLines,

    addedLinesByAuthor: createMap(commit.author, fileChange.addedLines),
    removedLinesByAuthor: createMap(commit.author, fileChange.removedLines),
    changedLinesByAuthor: createMap(commit.author, fileChange.changedLines),
  } as unknown as IDirtyFile;
}

function updateDirtyFile(file: any, fileChange: IFileChange, commit: ICommit) {
  file.action = fileChange.action;
  file.lastCommit = commit.milliseconds;

  file.commits += 1;

  if (commit.task) file.tasks.add(commit.task);
  if (commit.timestamp) file.days.add(commit.timestamp);

  const daysByAuthor = file.daysByAuthor.get(commit.author) || new Set();
  daysByAuthor.add(commit.timestamp);
  file.daysByAuthor.set(commit.author, daysByAuthor);

  incrementMap(file.authors, commit.author);
  incrementMap(file.companies, commit.company);
  incrementMap(file.types, commit.type);
  incrementMap(file.scope, commit.scope);
  incrementMap(file.taskCode, commit.taskCode);

  file.addedLines += fileChange.addedLines;
  file.removedLines += fileChange.removedLines;
  file.changedLines += fileChange.changedLines;

  incrementMap(file.addedLinesByAuthor, commit.author, fileChange.addedLines);
  incrementMap(file.removedLinesByAuthor, commit.author, fileChange.removedLines);
  incrementMap(file.changedLinesByAuthor, commit.author, fileChange.changedLines);
}

function getNameTypeExtension(name: string) {
  const extensionIndex = name.lastIndexOf('.');
  const extension = name.substring(extensionIndex + 1);
  const shortName = name.substring(0, extensionIndex);
  const typeIndex = shortName.lastIndexOf('.');
  const type = typeIndex !== -1
    ? shortName.substring(typeIndex + 1)
    : '';
  return { type, extension };
}

function updateTotalInfoAboutDirtyFile(file: any, middleSalaryInDay: number) {
  const parts = file.path.split('/');
  const name = parts.pop() || '';
  const { type, extension } = getNameTypeExtension(name);

  file.name = name;
  file.type = type;
  file.extension = extension;

  file.pathString = file.path;
  file.path = parts;

  file.totalTasks = file.tasks.size;
  file.tasks = Array.from(file.tasks);

  file.authors = Object.fromEntries(file.authors.entries());
  file.companies = Object.fromEntries(file.companies.entries());
  file.types = Object.fromEntries(file.types.entries());
  file.scope = Object.fromEntries(file.scope.entries());
  file.taskCode = Object.fromEntries(file.taskCode.entries());

  file.totalDays = file.days.size;
  file.days = Array.from(file.days);
  file.daysByAuthor = Object.fromEntries(file.daysByAuthor.entries());
  file.money = file.totalDays * middleSalaryInDay;

  file.lines = file.addedLines - file.removedLines;
  if (file.lines < 0) file.lines = 0;

  file.addedLinesByAuthor = Object.fromEntries(file.addedLinesByAuthor.entries());
  file.removedLinesByAuthor = Object.fromEntries(file.removedLinesByAuthor.entries());
  file.changedLinesByAuthor = Object.fromEntries(file.changedLinesByAuthor.entries());
}

export {
  createDirtyFile,
  updateDirtyFile,
  updateTotalInfoAboutDirtyFile,
};
