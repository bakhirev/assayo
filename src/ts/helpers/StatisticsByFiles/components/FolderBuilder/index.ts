import { IDirtyFile, IFolder } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

import {
  createFolder,
  updateFolder,
  updateTotalInfoAboutFolder,
} from './createUpdateTotal';

export default class FileGripByFolder {
  tree: IFolder = createFolder();

  folders: IFolder[] = [];

  // achievements
  addedFoldersByAuthor: IHashMap<string[]> = {};

  clear() {
    this.tree = createFolder();
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
        const newFolder = createFolder(folderName, path, file);
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

  updateTotalInfo(middleSalaryInDay: number) {
    this.folders.forEach((folder: IFolder) => {
      updateTotalInfoAboutFolder(folder, middleSalaryInDay);

      const author = folder.createAuthor || '';
      if (!this.addedFoldersByAuthor[author]) this.addedFoldersByAuthor[author] = [];
      this.addedFoldersByAuthor[author].push(folder.pathString);
    });
    this.folders = [];
  }
}
