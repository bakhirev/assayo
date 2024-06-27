import ICommit, { IFileChange, ISystemCommit } from 'ts/interfaces/Commit';

import IHashMap from 'ts/interfaces/HashMap';
import { ONE_DAY, ONE_WEEK } from 'ts/helpers/formatter';

import getCommitInfo from './getCommitInfo';
import { getInfoFromPath, getNumStatInfo, getRawInfo } from './getFileChanges';

function updateLineTotal(commit: any, line: any) {
  commit.added += line.addedLines || 0;
  commit.removed += line.removedLines || 0;
  commit.changes += line.changedLines || 0;
}

export default function Parser(report: string[]) {
  let commit = null;
  const commits: Array<ICommit | ISystemCommit> = [];

  let files: IHashMap<IFileChange> = {};
  let fileChanges: IFileChange | null = null;

  let firstMonday = 0;

  for (let i = 0, l = report.length; i < l; i += 1) {
    const message = report[i];
    if (!message) continue;

    const index = message.indexOf('\t');
    if (index > 0 && index < 10) {
      // парсинг файлов формата --num-stat
      // "1	0	.browserlistrc"
      const line = getNumStatInfo(message);
      if (!files[line.path]) {
        files[line.path] = getInfoFromPath(line.path);
      }
      fileChanges = files[line.path];
      fileChanges.addedLines = line.addedLines;
      fileChanges.removedLines = line.removedLines;
      fileChanges.changedLines = line.changedLines;
      updateLineTotal(commit, line);

    } else if (message[0] === ':') {
      // парсинг файлов формата --raw
      // ":000000 100644 0000000 496d1ef A	.browserlistrc"
      const line = getRawInfo(message);
      if (!files[line.path]) {
        files[line.path] = getInfoFromPath(line.path);
      }
      fileChanges = files[line.path];
      fileChanges.action = line.action;

    } else {
      // парсинг коммита
      // "2021-02-09T16:08:15+03:00>Albert>instein@mail.de>feat(init): added the speed of light"
      if (commit) commit.fileChanges = Object.values(files);
      files = {};
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

  return commits;
}
