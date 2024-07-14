import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

import FileBuilderCommon from './Common';
import FileBuilderLineStat from './LineStat';

export default class FileGripByPaths {
  list: IDirtyFile[] = [];

  refFileIds: IHashMap<IDirtyFile> = {};

  refRemovedFileIds: IHashMap<IDirtyFile> = {};

  refExtensionType: IHashMap<IHashMap<number>> = {}; // TODO: remove me?

  clear() {
    this.list = [];
    this.refFileIds = {};
    this.refRemovedFileIds = {};
  }

  addCommit(fileChange: IFileChange, commit: ICommit) {
    let file = this.refFileIds[fileChange.id] || this.refFileIds[fileChange.newId || ''];
    if (file) {
      this.#updateDirtyFile(file, fileChange, commit);
    } else {
      file = this.#getNewDirtyFile(fileChange, commit) as IDirtyFile;
      this.refFileIds[fileChange.id] = file;
    }

    if (fileChange.newId) {
      this.#renameFile(file, fileChange.newId);
    }
  }

  #getNewDirtyFile(fileChange: IFileChange, commit: ICommit): any {
    const commonProps = FileBuilderCommon.getProps(fileChange, commit);
    const statProps = FileBuilderLineStat.getProps(fileChange, commit);

    return {
      id: fileChange.id,
      ...commonProps,
      ...statProps,
    };
  }

  #updateDirtyFile(file: any, fileChange: IFileChange, commit: ICommit) {
    FileBuilderCommon.updateProps(file, fileChange, commit);
    FileBuilderLineStat.updateProps(file, fileChange, commit);
  }

  #renameFile(file: any, newId: string) {
    this.refFileIds[newId] = this.refFileIds[file.id];
    delete this.refFileIds[file.id];
    file.id = newId;
  }

  #removeFile(file: any) {
    file.action = 'D';
    this.refRemovedFileIds[file.id] = this.refFileIds[file.id];
    this.refRemovedFileIds[file.id].action = 'D';
    delete this.refFileIds[file.id];
  }

  updateTotalInfo(callback?: Function) {
    this.list = Object.values(this.refFileIds);
    this.list.forEach((temp: any) => {
      const file = temp;

      FileBuilderCommon.updateTotal(file);
      FileBuilderLineStat.updateTotal(file);

      if (file.type) {
        if (!this.refExtensionType[file.extension])  this.refExtensionType[file.extension] = {};
        this.refExtensionType[file.extension][file.type] = this.refExtensionType[file.extension][file.type]
          ? (this.refExtensionType[file.extension][file.type] + 1)
          : 1;
      }

      if (file.lines === 0
        || file.action === 'D'
        || file.action === 'A') {
        this.#removeFile(file);
      }

      if (callback) {
        callback(file);
      }
    });
  }
}
