import { IDirtyFile } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';

import getUserInfo from './user_info';
import { getNewFileName, getFileList } from './files';
import settingsStore from 'ts/store/Settings';

export default function Parser(
  report: string[],
  parseCommit: Function,
) {
  const allFiles: IHashMap<IDirtyFile> = {};
  const commits: ICommit[] = [];
  let week: number = 0;
  let weekEndTime: number = 0;

  let prev = null;
  let isFileInfo = false; // [ name, file, empty ];

  for (let i = 0, l = report.length; i < l; i += 1) {
    const message = report[i];
    if (!message) {
      isFileInfo = false;
      continue;
    }

    if (isFileInfo) {
      let [addedRaw, removedRaw, fileName] = message.split('\t');
      fileName = getNewFileName(fileName, allFiles);
      let added = parseInt(addedRaw, 10) || 0;
      let removed = parseInt(removedRaw, 10) || 0;
      const diff = added - removed;
      let changes = added > removed ? removed : added;

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
          delete allFiles[fileName];
        }
      } else {
        allFiles[fileName] = {
          name: fileName,
          lines: added,
          // @ts-ignore
          created: prev,
          authors: {
            [prev?.author || '']: {
              added: added,
              changes: added,
              removed: 0,
              commits: 1,
              tasks: { [prev?.task || '']: 1 },
              types: { [prev?.type || '']: 1 },
              scopes: { [prev?.scope || '']: 1 },
            },
          },
        };
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
      if (prev) {
        prev.changes += changes;
        prev.added += added;
        prev.removed += removed;
      }
    } else {
      if (prev) parseCommit(prev);
      const next = getUserInfo(message);
      if (next.milliseconds > weekEndTime) {
        week += 1;
        weekEndTime = next.milliseconds + (settingsStore.ONE_DAY * (6 - next.day));
      }
      // @ts-ignore
      next.week = week;

      prev = next;
      commits.push(prev);
      isFileInfo = true;
    }
  }
  if (prev) parseCommit(prev);


  const { fileList, fileTree } = getFileList(allFiles);
  return {
    commits,
    fileList,
    fileTree,
  };
}
