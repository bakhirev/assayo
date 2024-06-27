import IHashMap from 'ts/interfaces/HashMap';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

interface IStatByAuthor {
  addedFiles: number;
  removedFiles: number;
  addedWithoutRemoveFiles: number;
}

export default class FileGripByAuthor {
  statisticByName: IHashMap<IStatByAuthor> = {};

  totalAddedFiles: number = 0;

  clear() {
    this.statisticByName = {};
  }

  addFile(file: IDirtyFile) {
    const firstAuthor = file?.firstCommit?.author || '';
    const lastAuthor = file?.lastCommit?.author || '';

    if (!(firstAuthor || lastAuthor) || file?.name?.[0] === '.') return;

    this.#addCommitByAuthor(firstAuthor);
    this.#addCommitByAuthor(lastAuthor);
    this.#updateCommitByAuthor(file, firstAuthor, lastAuthor);
  }

  #addCommitByAuthor(author: string) {
    if (this.statisticByName[author]) return;
    this.statisticByName[author] = {
      addedFiles: 0,
      removedFiles: 0,
      addedWithoutRemoveFiles: 0,
    };
  }

  #updateCommitByAuthor(file: IDirtyFile, firstAuthor: string, lastAuthor: string) {
    const createStatistic = this.statisticByName[firstAuthor];
    const removeStatistic = this.statisticByName[lastAuthor];

    createStatistic.addedWithoutRemoveFiles += 1;
    if (file.action === 'D') {
      removeStatistic.removedFiles += 1;
    } else {
      createStatistic.addedFiles += 1;
    }
  }

  updateTotalInfo() {
    this.totalAddedFiles = Object.values(this.statisticByName)
      .reduce((sum: number, stat: any) => sum + stat.addedFiles, 0);
  }
}
