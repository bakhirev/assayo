import { IDirtyFile, IFolder } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

import { getValuesInPercent } from '../helpers';

function getFolder(name?: string, path?: string[], file?: IDirtyFile): IFolder {
  const tasks = file?.tasks
    ? new Set(file.tasks)
    : new Set();

  const timestamp = file?.timestamp
    ? new Set(file.timestamp) as Set<string>
    : new Set();

  return {
    id: Math.random(),
    name: name || '', // @ts-ignore
    path: path || [],
    pathString: `${(path || []).join('/')}/${name || ''}`,
    content: new Map(),

    tasks: tasks as Set<string>,
    timestamp: timestamp as Set<string>,
    totalTasks: tasks.size,
    totalDays: timestamp.size,

    lines: file?.lines || 0,

    addedLines: file?.addedLines || 0,
    removedLines: file?.removedLines || 0,
    changedLines: file?.changedLines || 0,

    addedLinesByAuthor: { ...(file?.addedLinesByAuthor || {})  },
    removedLinesByAuthor: { ...(file?.removedLinesByAuthor || {}) },
    changedLinesByAuthor: { ...(file?.changedLinesByAuthor || {}) },

    addedByAuthorInPercent: {},
    removedByAuthorInPercent: {},
    changedByAuthorInPercent: {},

    firstCommit: file?.firstCommit || null,
    lastCommit: file?.firstCommit || null,
  };
}

function updateFolderBy(folder: any, file: IDirtyFile, property: string) {
  for (let author in file[property]) {
    const folderAddedLinesByAuthor = folder[property][author];
    const fileAddedLinesByAuthor = file[property][author];
    folder[property][author] = folderAddedLinesByAuthor
      ? (folderAddedLinesByAuthor + fileAddedLinesByAuthor)
      : fileAddedLinesByAuthor;
  }
}

function updateFolder(folder: any, file: IDirtyFile) {
  folder.lastCommit = file.lastCommit;
  folder.lines += file.lines;

  folder.addedLines += file.addedLines || 0;
  folder.removedLines += file.removedLines || 0;
  folder.changedLines += file.changedLines || 0;

  // TODO: bad performance
  folder.tasks = new Set([...folder.tasks, ...file.tasks]);
  folder.timestamp = new Set([...folder.timestamp, ...file.timestamp]);
  folder.totalTasks = folder.tasks.size;
  folder.totalDays = folder.timestamp.size;

  updateFolderBy(folder, file, 'addedLinesByAuthor');
  updateFolderBy(folder, file, 'removedLinesByAuthor');
  updateFolderBy(folder, file, 'changedLinesByAuthor');
}

export default class FileGripByFolder {
  tree: IFolder = getFolder();

  folders: IFolder[] = [];

  // achievements
  addedFoldersByAuthor: IHashMap<string[]> = {};

  clear() {
    this.tree = getFolder();
    this.folders = [];
  }

  addFile(file: IDirtyFile) {
    let prev: any = this.tree.content;
    file.path.forEach((folderName: any, index: number) => {
      const folder = prev.get(folderName);
      if (!folder?.content) {
        const path = file.path.slice(0, index);
        const newFolder = getFolder(folderName, path, file);
        prev.set(folderName, newFolder);
        this.folders.push(newFolder);
        prev = newFolder.content;
      } else {
        updateFolder(folder, file);
        prev = folder.content;
      }
    });
    prev.set(file.name, file);
  }

  updateTotalInfo() {
    this.folders.forEach((folder: IFolder) => {
      folder.addedByAuthorInPercent = getValuesInPercent(folder.addedLinesByAuthor, folder.addedLines);
      folder.removedByAuthorInPercent = getValuesInPercent(folder.removedLinesByAuthor, folder.removedLines);
      folder.changedByAuthorInPercent = getValuesInPercent(folder.changedLinesByAuthor, folder.changedLines);

      const author = folder.firstCommit?.author || '';

      if (!this.addedFoldersByAuthor[author]) this.addedFoldersByAuthor[author] = [];
      this.addedFoldersByAuthor[author].push(folder.pathString);
    });
    this.folders = [];
  }
}
