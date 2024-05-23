import ICommit, { ISystemCommit, IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

import FileBuilder from './components/FileBuilder';
import FileGripByExtension from './components/extension';
import FileGripByType from './components/type';
import FileGripByFolder from './components/folder';

class FileGrip {
  files: any = new FileBuilder();

  extension: any = new FileGripByExtension();

  type: any = new FileGripByType();

  tree: any = new FileGripByFolder();

  removedTree: any = new FileGripByFolder();

  clear() {
    this.files.clear();
    this.extension.clear();
    this.type.clear();
    this.tree.clear();
    this.removedTree.clear();
  }

  addCommit(commit: ICommit | ISystemCommit) {
    if (!commit?.fileChanges?.length) return;

    commit.fileChanges.forEach((fileChange: IFileChange) => {
      this.files.addCommit(fileChange, commit);
    });
  }

  updateTotalInfo() {
    this.files.updateTotalInfo((file: IDirtyFile) => {
      this.extension.addFile(file);
      this.type.addFile(file);
      if (file.action !== 'D') {
        this.tree.addFile(file);
      } else {
        this.removedTree.addFile(file);
      }
    });

    this.extension.updateTotalInfo();
    this.type.updateTotalInfo();
    this.tree.updateTotalInfo();
    this.removedTree.updateTotalInfo();
  }
}

const fileGrip = new FileGrip();

export default fileGrip;
