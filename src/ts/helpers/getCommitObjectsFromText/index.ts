import ICommit, { IFileChange, ISystemCommit } from 'ts/interfaces/Commit';

import { ONE_DAY, ONE_WEEK } from 'ts/helpers/formatter';

import getCommitInfo, { clearCache } from './getCommitInfo';
import { clearRenameCache } from './getEmailAuthor';
import {
  getInfoFromPath,
  getNumStatInfo,
  getRawInfo,
} from './getFileChanges';

function updateLineTotal(commit: any, line: any) {
  commit.added += line.addedLines || 0;
  commit.removed += line.removedLines || 0;
  commit.changes += line.changedLines || 0;
}

function isNumStatLine(message: string) {
  return message[1] === '\t'
    || message[2] === '\t'
    || message[3] === '\t'
    || message[4] === '\t'
    || message[5] === '\t'
    || message[6] === '\t'
    || message[7] === '\t';
}

export default function getCommitObjectsFromText(report: string[]) {
  let commit = null;
  const commits: Array<ICommit | ISystemCommit> = [];

  let files: IFileChange[] = [];
  let fileNumIndex = 0;
  let fileChanges: IFileChange | null = null;

  let firstMonday = 0;

  for (let i = 0; i < report.length; i += 1) {
    const message = report[i];
    if (!message) continue;

    if (message[0] === ':') {
      // парсинг файлов формата --raw
      // ":000000 100644 0000000 496d1ef A	.browserlistrc"
      // ":000000 100644 0000000 496d1ef R100	.browserlistrc"
      const line = getRawInfo(message);
      fileChanges = getInfoFromPath(line.path);
      fileChanges.action = line.action;
      files.push(fileChanges);

    } else if (isNumStatLine(message)) {
      // парсинг файлов формата --num-stat
      // "1	0	.browserlistrc"
      const line = getNumStatInfo(message);
      fileChanges = files[fileNumIndex] as IFileChange;
      if (!fileChanges) {
        fileChanges = getInfoFromPath(line.path);
        files.push(fileChanges);
      }
      fileNumIndex += 1;
      fileChanges.addedLines = line.addedLines;
      fileChanges.removedLines = line.removedLines;
      fileChanges.changedLines = line.changedLines;
      updateLineTotal(commit, line);

    } else {
      // парсинг коммита
      // "2021-02-09T16:08:15+03:00>Albert>instein@mail.de>feat(init): added the speed of light"
      if (commit) commit.fileChanges = files;
      files = [];
      fileNumIndex = 0;
      commit = getCommitInfo(message);

      const monday = commit.milliseconds - commit.day * ONE_DAY;
      if (firstMonday) {
        commit.week = Math.floor((firstMonday - monday) / ONE_WEEK);
      } else {
        firstMonday = monday;
      }

      commits.push(commit);
    }
  }

  clearRenameCache();
  clearCache();

  return commits;
}
