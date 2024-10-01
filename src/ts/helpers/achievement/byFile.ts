import { IDirtyFile } from 'ts/interfaces/FileInfo';
import IHashMap from 'ts/interfaces/HashMap';

function getHashMap(list: string[]) {
  return Object.fromEntries(list.map((code: string) => [code, true]));
}

const IS_LINT_HINT = getHashMap(['.eslintrc', '.stylelintrc.json']);
const IS_CSS = getHashMap(['css', 'scss', 'less', 'style']);
const IS_TEST = getHashMap(['test', 'mock', 'snap']);
const IS_CI_CD = getHashMap([
  'Dockerfile',
  'gradlew',
  'gradlew.bat',
  'gradle.properties',
  'docker-compose.yml',
]);

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
  const fileRush: IHashMap<number> = {};

  fileGrip.files.list.forEach((file: IDirtyFile) => {
    if (IS_LINT_HINT[file.name]) moreLintHint.push(getAddedChangedLines(file));
    if (file.extension === 'md') moreReadMe.push(getAddedChangedLines(file));
    if (IS_CSS[file.extension]) moreStyle.push(getAddedChangedLines(file));
    if (IS_TEST[file.extension] || IS_TEST[file.type]) moreTests.push(getAddedChangedLines(file));
    if (IS_CI_CD[file.name]) moreDevOps.push(getAddedChangedLines(file));

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
}
