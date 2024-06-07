import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

export default class FileGripByAuthor {
  addedFilesByAuthor: IHashMap<number> = {};

  addedWithoutRemoveFilesByAuthor: IHashMap<number> = {};

  removedFilesByAuthor: IHashMap<number> = {};

  totalAddedFiles: number = 0;

  clear() {
    this.addedFilesByAuthor = {};
    this.addedWithoutRemoveFilesByAuthor = {};
    this.removedFilesByAuthor = {};
    this.totalAddedFiles = 0;
  }

  addFile(file: IDirtyFile) {
    const create = file?.firstCommit?.author || '';
    const remove = file?.lastCommit?.author || '';

    if (!(create || remove) || file?.name?.[0] === '.') return;

    this.#addNewAuthor(create);
    this.#addNewAuthor(remove);

    this.addedWithoutRemoveFilesByAuthor[create] += 1;
    if (file.action !== 'D') {
      this.addedFilesByAuthor[create] += 1;
    } else {
      this.removedFilesByAuthor[remove] += 1;
    }
  }

  #addNewAuthor(author: string) {
    const value = this.addedFilesByAuthor[author];
    if (value || value === 0) return;
    this.addedFilesByAuthor[author] = 0;
    this.addedWithoutRemoveFilesByAuthor[author] = 0;
    this.removedFilesByAuthor[author] = 0;
  }

  updateTotalInfo() {
    this.totalAddedFiles = Object.values(this.addedFilesByAuthor)
      .reduce((sum: number, value: number) => sum + value, 0);
  }
}
