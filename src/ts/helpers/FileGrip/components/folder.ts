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
    addedRemovedChangedInPercent: {},

    firstCommit: file?.firstCommit || null,
    lastCommit: file?.firstCommit || null,
  };
}

function updateFolder(folder: any, file: IDirtyFile) {
  folder.lastCommit = file.lastCommit;
  folder.lines += file.lines;

  folder.addedLines += file.addedLines || 0;
  folder.removedLines += file.removedLines || 0;
  folder.changedLines += file.changedLines || 0;

  for (let author in file.addedLinesByAuthor) {
    folder.addedLinesByAuthor[author] = folder.addedLinesByAuthor[author]
      ? (folder.addedLinesByAuthor[author] + file.addedLinesByAuthor[author])
      : file.addedLinesByAuthor[author];
  }

  for (let author in file.removedLinesByAuthor) {
    folder.removedLinesByAuthor[author] = folder.removedLinesByAuthor[author]
      ? (folder.removedLinesByAuthor[author] + file.removedLinesByAuthor[author])
      : file.removedLinesByAuthor[author];
  }

  for (let author in file.changedLinesByAuthor) {
    folder.changedLinesByAuthor[author] = folder.changedLinesByAuthor[author]
      ? (folder.changedLinesByAuthor[author] + file.changedLinesByAuthor[author])
      : file.changedLinesByAuthor[author];
  }
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

      folder.addedRemovedChangedInPercent = getValuesInPercent({
        added: folder.addedLines,
        removed: folder.removedLines,
        changed: folder.changedLines,
      }, folder.addedLines + folder.removedLines + folder.changedLines);

      const author = folder.firstCommit?.author || '';

      if (!this.addedFoldersByAuthor[author]) this.addedFoldersByAuthor[author] = [];
      this.addedFoldersByAuthor[author].push(folder.pathString);
    });
    this.folders = [];
  }
}
