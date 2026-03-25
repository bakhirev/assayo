import { IDirtyFile, IFolder } from 'ts/interfaces/FileInfo';

function createMap(stat?: Record<string, number>) {
  return stat
    ? new Map(Object.entries(stat))
    : new Map();
}

function incrementMap(map: Map<string, number>, stat?: Record<string, number>) {
  if (!stat) return;
  for (const key in stat) {
    const prev = map.get(key) || 0;
    map.set(key, prev + stat[key]);
  }
}

function incrementDaysByAuthor(total: any, item: any) {
  if (!item) return total;
  for (const key in item) {
    total[key] = new Set([...(total[key] || []), ...(item[key] || [])]);
  }
  return total;
}

function createFolder(name?: string, path?: string[], file?: IDirtyFile): IFolder {
  return {
    id: Math.random(),
    name: name || '', // @ts-ignore
    path: path || [],
    pathString: `${(path || []).join('/')}/${name || ''}`,
    content: new Map(),

    lines: file?.lines || 0,
    action: 'F', // TODO: remove file stat

    commits: file?.commits || 0,
    firstCommit: 0,
    lastCommit: 0,

    // achievements
    createAuthor: file?.createAuthor || '',
    createYear: file?.createYear,

    // page: types, extensions
    tasks: new Set(file?.tasks || []),
    totalTasks: 0,

    days: new Set(file?.days || []),
    daysByAuthor: incrementDaysByAuthor({}, file?.daysByAuthor),
    totalDays: 0,
    money: 0,

    // page: files -> table: search filters
    authors: createMap(file?.authors),
    companies: createMap(file?.companies),
    types: createMap(file?.types),
    scope: createMap(file?.scope),
    taskCode: createMap(file?.taskCode),

    // page: files -> table: line charts
    addedLines: file?.addedLines || 0,
    removedLines: file?.removedLines || 0,
    changedLines: file?.changedLines || 0,

    addedLinesByAuthor: createMap(file?.addedLinesByAuthor),
    removedLinesByAuthor: createMap(file?.removedLinesByAuthor),
    changedLinesByAuthor: createMap(file?.changedLinesByAuthor),
  } as unknown as IFolder;
}

function updateFolder(folder: any, file: IDirtyFile) {
  folder.lines += file.lines;
  folder.commits += file?.commits;

  // for performance
  for (let i = 0; i < file.tasks.length; i++) {
    folder.tasks.add(file.tasks[i]);
  }
  for (let i = 0; i < file.days.length; i++) {
    folder.days.add(file.days[i]);
  }

  incrementDaysByAuthor(folder.daysByAuthor, file?.daysByAuthor);

  incrementMap(folder.authors, file.authors);
  incrementMap(folder.companies, file.companies);
  incrementMap(folder.types, file.types);
  incrementMap(folder.scope, file.scope);

  folder.addedLines += file.addedLines || 0;
  folder.removedLines += file.removedLines || 0;
  folder.changedLines += file.changedLines || 0;

  incrementMap(folder.addedLinesByAuthor, file.addedLinesByAuthor);
  incrementMap(folder.removedLinesByAuthor, file.removedLinesByAuthor);
  incrementMap(folder.changedLinesByAuthor, file.changedLinesByAuthor);
}

function updateTotalInfoAboutFolder(folder: any, middleSalaryInDay: number) {
  folder.totalTasks = folder.tasks.size;
  folder.tasks = Array.from(folder.tasks);

  folder.totalDays = folder.days.size;
  folder.days = Array.from(folder.days);

  folder.authors = Object.fromEntries(folder.authors.entries());
  folder.companies = Object.fromEntries(folder.companies.entries());
  folder.types = Object.fromEntries(folder.types.entries());
  folder.scope = Object.fromEntries(folder.scope.entries());
  folder.taskCode = Object.fromEntries(folder.taskCode.entries());

  folder.totalDaysByAuthor = Object
    .values(folder.daysByAuthor)
    .reduce((acc, curr: any) => acc + curr.size, 0);
  folder.daysByAuthor = Object.fromEntries(
    Object.entries(folder.daysByAuthor)
      .map(([key, value]: any[]) => [key, value.size]),
  );
  folder.money = folder.totalDaysByAuthor * middleSalaryInDay;

  folder.lines = folder.addedLines - folder.removedLines;
  if (folder.lines < 0) folder.lines = 0;

  folder.addedLinesByAuthor = Object.fromEntries(folder.addedLinesByAuthor.entries());
  folder.removedLinesByAuthor = Object.fromEntries(folder.removedLinesByAuthor.entries());
  folder.changedLinesByAuthor = Object.fromEntries(folder.changedLinesByAuthor.entries());
}

export {
  createFolder,
  updateFolder,
  updateTotalInfoAboutFolder,
};
