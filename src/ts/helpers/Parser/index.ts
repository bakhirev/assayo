import ICommit, { IFileChange, ISystemCommit } from 'ts/interfaces/Commit';

import IHashMap from 'ts/interfaces/HashMap';
import { ONE_DAY, ONE_WEEK } from 'ts/helpers/formatter';

import getCommitInfo from './getCommitInfo';
import { getInfoFromPath, getNumStatInfo, getRawInfo } from './getFileChanges';

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
    if (index > 0 && index < 10) { // парсинг файлов формата --num-stat
      const line = getNumStatInfo(message);
      if (!files[line.path]) {
        files[line.path] = getInfoFromPath(line.path);
      }
      fileChanges = files[line.path];
      fileChanges.addedLines = line.addedLines;
      fileChanges.removedLines = line.removedLines;
      fileChanges.changedLines = line.changedLines;

    } else if (message[0] === ':') { // парсинг файлов формата --raw
      const line = getRawInfo(message);
      if (!files[line.path]) {
        files[line.path] = getInfoFromPath(line.path);
      }
      fileChanges = files[line.path];
      fileChanges.action = line.action;

    } else { // парсинг коммита
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
