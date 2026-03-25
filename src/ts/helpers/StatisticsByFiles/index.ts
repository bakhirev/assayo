import ICommit, { ISystemCommit, IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';
import applicationConfig from 'ts/store/ApplicationConfig';

import FileBuilder from './components/FileBuilder';
import FileGripByFolder from './components/FolderBuilder';
import FileGripByExtension from './components/extension';
import FileGripByType from './components/type';
import FileGripByRefactor from './components/refactor';

class FileGrip {
  files: any = new FileBuilder();

  extension: any = new FileGripByExtension();

  type: any = new FileGripByType();

  tree: any = new FileGripByFolder();

  removedTree: any = new FileGripByFolder();

  refactor: any = new FileGripByRefactor();

  clear() {
    this.files.clear();
    this.extension.clear();
    this.type.clear();
    this.tree.clear();
    this.removedTree.clear();
    this.refactor.clear();
  }

  addCommit(commit: ICommit | ISystemCommit) {
    if (!commit?.fileChanges?.length) return;

    commit.fileChanges.forEach((fileChange: IFileChange) => {
      this.files.addCommit(fileChange, commit);
    });
  }

  updateTotalInfo() {
    const middleSalaryInDay = applicationConfig.getMiddleSalaryInDay();
    this.files.updateTotalInfo((file: IDirtyFile) => {
      this.extension.addFile(file);
      this.type.addFile(file);
      if (file.action === 'D') {
        this.removedTree.addFile(file);
      } else {
        this.tree.addFile(file);
      }
    }, middleSalaryInDay);

    this.extension.updateTotalInfo();
    this.type.updateTotalInfo();
    this.tree.updateTotalInfo(middleSalaryInDay);
    this.removedTree.updateTotalInfo(middleSalaryInDay);
    this.refactor.updateTotalInfo(this.files.list);
  }
}

const statisticsByFiles = new FileGrip();

export default statisticsByFiles;
