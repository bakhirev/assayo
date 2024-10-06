import { IDirtyFile, IFolder } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

import { getValuesInPercent } from '../helpers';

function getFolder(name?: string, path?: string[], file?: IDirtyFile): IFolder {
  return {
    id: Math.random(),
    name: name || '', // @ts-ignore
    path: path || [],
    pathString: `${(path || []).join('/')}/${name || ''}`,
    content: {},

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
      let folder = prev[folderName];
      if (!folder || !folder.content) {
        const path = file.path.slice(0, index);
        prev[folderName] = getFolder(folderName, path, file);
        this.folders.push(prev[folderName]);
      } else {
        updateFolder(folder, file);
      }
      prev = prev[folderName].content;
    });
    prev[file.name] = file;
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
