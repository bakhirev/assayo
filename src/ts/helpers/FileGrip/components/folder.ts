import { IDirtyFile, IFolder } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

import { getValuesInPercent } from '../helpers';

function getFolder(name?: string, path?: string[], file?: IDirtyFile): IFolder {
  return {
    id: Math.random(),
    name: name || '', // @ts-ignore
    path: path || [],
    pathString: `${(path || []).join('/')}/${name || ''}`,
    content: new Map(),

    tasks: file?.tasks || [],
    timestamp: file?.timestamp || [],
    totalTasks: 0,
    totalDays: 0,

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

  // for performance
  for (let i = 0, l = file.tasks.length; i < l; i++) {
    folder.tasks.push(file.tasks[i]);
  }
  for (let i = 0, l = file.timestamp.length; i < l; i++) {
    folder.timestamp.push(file.timestamp[i]);
  }

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
    // for performance
    for (let index = 0, l = file.path.length; index < l; index++) {
      const folderName = file.path[index];
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
    }
    prev.set(file.name, file);
  }

  updateTotalInfo() {
    this.folders.forEach((folder: IFolder) => {
      folder.tasks = Array.from(new Set(folder.tasks));
      folder.timestamp = Array.from(new Set(folder.timestamp));
      folder.totalTasks = folder.tasks.length;
      folder.totalDays = folder.timestamp.length;

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
