import ICommit, { ISystemCommit, IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

import FileBuilder from './components/FileBuilder';
import FileGripByExtension from './components/extension';
import FileGripByType from './components/type';
import FileGripByFolder from './components/folder';
import FileGripByAuthor from './components/author';
import FileGripByRefactor from './components/refactor';

class FileGrip {
  files: any = new FileBuilder();

  extension: any = new FileGripByExtension();

  type: any = new FileGripByType();

  tree: any = new FileGripByFolder();

  removedTree: any = new FileGripByFolder();

  author: any = new FileGripByAuthor();

  refactor: any = new FileGripByRefactor();

  clear() {
    this.files.clear();
    this.extension.clear();
    this.type.clear();
    this.tree.clear();
    this.removedTree.clear();
    this.author.clear();
    this.refactor.clear();
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
      this.author.addFile(file);
      if (file.action !== 'D') {
        this.tree.addFile(file);
      } else {
        this.removedTree.addFile(file);
      }
    });

    this.extension.updateTotalInfo();
    this.type.updateTotalInfo();
    this.author.updateTotalInfo();
    this.tree.updateTotalInfo();
    this.removedTree.updateTotalInfo();
    this.refactor.updateTotalInfo(this.files.list);
  }
}

const fileGrip = new FileGrip();

export default fileGrip;
