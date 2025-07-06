import { IDirtyFile } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';
import {
  IS_ACHIEVEMENT_SITNIK,
  IS_CSS,
  IS_CSS_NAME,
  IS_CI_CD,
  IS_DOC,
  IS_LINT_HINT,
  IS_TEST,
} from './constants/is';

function getAddedChangedLines(file: IDirtyFile) {
  return [
    Object.entries(file?.addedLinesByAuthor || {}),
    Object.entries(file?.changedLinesByAuthor || {}),
  ];
}

function getTopUser(listOfChanges: any) {
  const total = listOfChanges.reduce((acc: any, item: any) => {
    acc[item[0]] = acc[item[0]] ? (acc[item[0]] + item[1]) : item[1];
    return acc;
  }, {});

  return Object.entries(total).sort((a: any, b: any) => b[1] - a[1]);
}

export default function getAchievementByFile(fileGrip: any, byAuthor: any) {
  if (!fileGrip.files.list.length) return;

  const moreLintHint: any = [];
  const moreReadMe: any = [];
  const moreStyle: any = [];
  const moreTests: any = [];
  const moreDevOps: any = [];
  const longFilePath: any = { author: '', length: 0 };
  const longFileName: any = { author: '', length: 0 };
  const firstFileNameStyle: any = { author: '', milliseconds: Infinity };
  const fileRush: IHashMap<number> = {};

  fileGrip.files.list.forEach((file: IDirtyFile) => {
    if (IS_LINT_HINT.has(file.name)) {
      moreLintHint.push(getAddedChangedLines(file));
    } else if (IS_DOC.has(file.extension)) {
      moreReadMe.push(getAddedChangedLines(file));
    } else if (IS_CSS.has(file.extension) || IS_CSS_NAME.has(file.name)) {
      moreStyle.push(getAddedChangedLines(file));
    } else if (IS_ACHIEVEMENT_SITNIK.has(file.name)) {
      if (file?.firstCommit?.milliseconds && file?.firstCommit?.milliseconds < firstFileNameStyle.milliseconds) {
        firstFileNameStyle.author = file.firstCommit?.author;
        firstFileNameStyle.milliseconds = file.firstCommit?.milliseconds;
      }
    } else if (IS_TEST.has(file.extension) || IS_TEST.has(file.type)) {
      moreTests.push(getAddedChangedLines(file));
    } else if (IS_CI_CD.has(file.name)) {
      moreDevOps.push(getAddedChangedLines(file));
    }

    fileRush[file.firstCommit?.author || ''] = fileRush[file.firstCommit?.author || '']
      ? (fileRush[file.firstCommit?.author || ''] + 1)
      : 1;

    if (file.name.length > longFileName.length) {
      longFileName.author = file.firstCommit?.author;
      longFileName.length = file.name.length;
    }
    if (file.path.length > longFilePath.length) {
      longFilePath.author = file.firstCommit?.author;
      longFilePath.length = file.name.length;
    }
  });

  const userFileRush = Object.entries(fileRush).sort((a: any, b: any) => b[1] - a[1]);

  const addedFoldersByAuthor = Object
    .entries(fileGrip.tree.addedFoldersByAuthor)
    .map((item: any) => [item[0], item[1].length]);

  byAuthor.add(getTopUser(userFileRush), 'fileRush');
  byAuthor.add(getTopUser(addedFoldersByAuthor), 'moreAddedFolders');
  byAuthor.add(getTopUser(moreLintHint.flat(2)), 'moreLintHint');
  byAuthor.add(getTopUser(moreReadMe.flat(2)), 'moreReadMe');
  byAuthor.add(getTopUser(moreStyle.flat(2)), 'moreStyle');
  byAuthor.add(getTopUser(moreTests.flat(2)), 'moreTests');
  byAuthor.add(getTopUser(moreDevOps.flat(2)), 'moreDevOps');
  byAuthor.authors[longFilePath.author].push('longFilePath');
  byAuthor.authors[longFileName.author].push('longFileName');
  if (firstFileNameStyle.author) {
    byAuthor.authors[firstFileNameStyle.author].push('publicitySitnik');
  }
}
