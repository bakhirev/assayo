import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import { increment } from 'ts/helpers/Math';

import {
  createDirtyFile,
  updateDirtyFile,
  updateTotalInfoAboutDirtyFile,
} from './createUpdateTotal';

export default class FileGripByPaths {
  list: IDirtyFile[] = [];

  refFileIds: HashMap<IDirtyFile> = new Map();

  refRemovedFileIds: HashMap<IDirtyFile> = new Map();

  refExtensionType: HashMap<IHashMap<number>> = new Map(); // TODO: remove me?

  clear() {
    this.list = [];
    this.refFileIds.clear();
    this.refRemovedFileIds.clear();
    this.refExtensionType.clear();
  }

  addCommit(fileChange: IFileChange, commit: ICommit) {
    // TODO: performance
    let file = this.refFileIds.get(fileChange.id);
    if (!file) file = this.refFileIds.get(fileChange.newId);
    if (file) {
      this.#updateDirtyFile(file, fileChange, commit);
    } else {
      file = this.#getNewDirtyFile(fileChange, commit) as IDirtyFile;
      this.refFileIds.set(fileChange.id, file);
    }

    if (fileChange.newId) {
      this.#renameFile(file, fileChange.newId);
    }
  }

  #getNewDirtyFile(fileChange: IFileChange, commit: ICommit): any {
    return createDirtyFile(fileChange, commit);
  }

  #updateDirtyFile(file: any, fileChange: IFileChange, commit: ICommit) {
    updateDirtyFile(file, fileChange, commit);
  }

  #renameFile(file: any, newId: string) {
    const oldFile = this.refFileIds.get(file.id) as IDirtyFile;
    this.refFileIds.set(newId, oldFile);
    this.refFileIds.delete(file.id);
    file.id = newId;
  }

  updateTotalInfo(callback: Function, middleSalaryInDay: number) {
    const list = Array.from(this.refFileIds.values());
    for (let i = 0; i < list.length; i++) {
      const file = list[i];

      updateTotalInfoAboutDirtyFile(file, middleSalaryInDay);

      if (file.type) {
        let refExtensionType = this.refExtensionType.get(file.extension);
        if (!refExtensionType) {
          refExtensionType = {};
          this.refExtensionType.set(file.extension, refExtensionType);
        }
        increment(refExtensionType, file.type);
      }

      if (file.lines === 0
        || file.action === 'D'
        || file.action === 'A') {
        this.#removeFile(file);
      }

      callback(file);
    }
    this.list = list;
  }

  #removeFile(file: any) {
    file.action = 'D';
    this.refRemovedFileIds.set(file.id, file);
    this.refFileIds.delete(file.id);
  }
}
