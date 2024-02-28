import { IDirtyFile } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';
import ICommit, { ISystemCommit } from 'ts/interfaces/Commit';
import settingsStore from 'ts/store/Settings';

import getUserInfo from './user_info';
import { getNewFileName, getFileList } from './files';
import { getNewFileInfo } from './file_info';

const uniq = {};
export default function Parser(
  report: string[],
  parseCommit: Function,
) {
  const allFiles: IHashMap<IDirtyFile> = {};
  const removedFiles: IHashMap<IDirtyFile> = {};
  const commits: Array<ICommit | ISystemCommit> = [];
  let week: number = 0;
  let weekEndTime: number = 0;

  let prev = null;

  for (let i = 0, l = report.length; i < l; i += 1) {
    const message = report[i];
    if (!message) continue;
    const index = message.indexOf('\t');
    if (index > 0 && index < 10) {
      let [addedRaw, removedRaw, fileName] = message.split('\t');
      fileName = getNewFileName(fileName, allFiles);
      let added = parseInt(addedRaw, 10) || 0;
      let removed = parseInt(removedRaw, 10) || 0;
      const diff = added - removed;
      let changes = added > removed ? removed : added;

      if (!allFiles[fileName] && removedFiles[fileName]) {
        allFiles[fileName] = removedFiles[fileName];
        delete removedFiles[fileName];
      }

      if (allFiles[fileName]) {
        const fileInfo: IDirtyFile = allFiles[fileName];
        fileInfo.lines += diff;
        if (!fileInfo.authors[prev?.author || '']) {
          fileInfo.authors[prev?.author || ''] = {
            added: 0,
            changes: 0,
            removed: 0,
            commits: 1,
            tasks: {},
            types: {},
            scopes: {},
          };
        }
        const authorInfo = fileInfo.authors[prev?.author || ''];
        authorInfo.changes = authorInfo.changes + changes;
        if (diff > 0) {
          authorInfo.added = authorInfo.added + diff;
        } else {
          authorInfo.removed = authorInfo.removed + diff * (-1);
        }
        authorInfo.commits += 1;
        authorInfo.tasks[prev?.task || ''] = (authorInfo.tasks[prev?.task || ''] || 0) + 1;
        authorInfo.types[prev?.type || ''] = (authorInfo.tasks[prev?.type || ''] || 0) + 1;
        authorInfo.scopes[prev?.scope || ''] = (authorInfo.tasks[prev?.scope || ''] || 0) + 1;
        if (allFiles[fileName].lines === 0) {
          removedFiles[fileName] = allFiles[fileName];
          delete allFiles[fileName];
        }
      } else {
        // @ts-ignore
        allFiles[fileName] = getNewFileInfo(fileName, added, prev);
      }
      if (removed > added) {
        removed -= added;
        changes += added;
        added = 0;
      } else if (added > removed) {
        added -= removed;
        changes += removed;
        removed = 0;
      } else if (added === removed) {
        changes += added;
        added = 0;
        removed = 0;
      }
      if (prev) { // @ts-ignore
        prev.changes += changes; // @ts-ignore
        prev.added += added; // @ts-ignore
        prev.removed += removed;
      }
    } else {
      if (prev) {
        if (uniq[prev.date]) {
          // console.log(`double ${uniq[prev.date]} === ${i}`);
        }
        uniq[prev.date] = i;
        parseCommit(prev);
      }

      const next = getUserInfo(message);
      if (next.milliseconds > weekEndTime) {
        week += 1;
        weekEndTime = next.milliseconds + (settingsStore.ONE_DAY * (6 - next.day));
      }
      // @ts-ignore
      next.week = week;

      prev = next;
      commits.push(prev); // @ts-ignore
    }
  }
  if (prev) parseCommit(prev);

  const { fileList, fileTree } = getFileList(allFiles);
  return {
    commits,
    fileList,
    fileTree,
    removed: getFileList(removedFiles),
  };
}
