import ICommit, { IFileChange } from 'ts/interfaces/Commit';
import { IDirtyFile } from 'ts/interfaces/FileInfo';

import { getValuesInPercent } from '../../helpers';

export default class FileBuilderLineStat {
  static getProps(fileChange: IFileChange, commit: ICommit) {
    return {
      lines: fileChange.addedLines,

      addedLines: fileChange.addedLines,
      removedLines: fileChange.removedLines,
      changedLines: fileChange.changedLines,

      addedLinesByAuthor: { [commit.author]: fileChange.addedLines },
      removedLinesByAuthor: { [commit.author]: fileChange.removedLines },
      changedLinesByAuthor: { [commit.author]: fileChange.changedLines },
    };
  }

  static updateProps(file: IDirtyFile, fileChange: IFileChange, commit: ICommit) {
    file.lines += fileChange.addedLines;
    file.lines -= fileChange.removedLines;

    file.addedLines += fileChange.addedLines;
    file.removedLines += fileChange.removedLines;
    file.changedLines += fileChange.changedLines;

    // TODO: performance
    const addedLinesByAuthor = file.addedLinesByAuthor[commit.author];
    file.addedLinesByAuthor[commit.author] = addedLinesByAuthor
      ? (addedLinesByAuthor + fileChange.addedLines)
      : fileChange.addedLines;

    const removedLinesByAuthor = file.removedLinesByAuthor[commit.author];
    file.removedLinesByAuthor[commit.author] = removedLinesByAuthor
      ? (removedLinesByAuthor + fileChange.removedLines)
      : fileChange.removedLines;

    const changedLinesByAuthor = file.changedLinesByAuthor[commit.author];
    file.changedLinesByAuthor[commit.author] = changedLinesByAuthor
      ? (changedLinesByAuthor + fileChange.changedLines)
      : fileChange.changedLines;
  }

  static updateTotal(file: IDirtyFile) {
    file.addedByAuthorInPercent = getValuesInPercent(file.addedLinesByAuthor, file.addedLines);
    file.removedByAuthorInPercent = getValuesInPercent(file.removedLinesByAuthor, file.removedLines);
    file.changedByAuthorInPercent = getValuesInPercent(file.changedLinesByAuthor, file.changedLines);
  }
}
