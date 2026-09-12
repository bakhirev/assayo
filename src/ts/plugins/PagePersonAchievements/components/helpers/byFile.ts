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

type Ranking = [string, number][];

function addLineCounts(target: Map<string, number>, byAuthor?: IHashMap<number>) {
  Object.entries(byAuthor || {}).forEach(([author, lines]) => {
    target.set(author, (target.get(author) || 0) + Number(lines || 0));
  });
}

function rankingFromMap(map: Map<string, number>): Ranking {
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

function addAward(result: IHashMap<string[]>, author?: string, code?: string) {
  if (!author || !code) return;
  result[author] = result[author] || [];
  result[author].push(code);
}

function addAwardForTop(result: IHashMap<string[]>, ranking: Ranking, code: string) {
  addAward(result, ranking[0]?.[0], code);
}

function getFileBucket(file: IDirtyFile) {
  if (IS_LINT_HINT.has(file.name)) return 'moreLintHint';
  if (IS_DOC.has(file.extension)) return 'moreReadMe';
  if (IS_CSS.has(file.extension) || IS_CSS_NAME.has(file.name)) return 'moreStyle';
  if (IS_TEST.has(file.extension) || IS_TEST.has(file.type)) return 'moreTests';
  if (IS_CI_CD.has(file.name)) return 'moreDevOps';
  return '';
}

export default function getAchievementByFile(statisticsByFiles: any): IHashMap<string[]> {
  const files = statisticsByFiles?.files?.list || [];
  const result: IHashMap<string[]> = {};
  if (!files.length) return result;

  const buckets: IHashMap<Map<string, number>> = {
    moreLintHint: new Map(),
    moreReadMe: new Map(),
    moreStyle: new Map(),
    moreTests: new Map(),
    moreDevOps: new Map(),
    fileRush: new Map(),
  };

  const longest = files.reduce((acc: any, file: IDirtyFile) => {
    const creator = file.createAuthor || '';
    const bucket = getFileBucket(file);
    if (bucket) {
      addLineCounts(buckets[bucket], file.addedLinesByAuthor);
      addLineCounts(buckets[bucket], file.changedLinesByAuthor);
    } else if (
      IS_ACHIEVEMENT_SITNIK.has(file.name)
      && file.firstCommit
      && file.firstCommit < acc.sitnik.milliseconds
    ) {
      acc.sitnik = { author: creator, milliseconds: file.firstCommit };
    }

    if (creator) {
      buckets.fileRush.set(creator, (buckets.fileRush.get(creator) || 0) + 1);
    }

    const nameLength = file.name?.length || 0;
    if (creator && nameLength > acc.fileName.length) {
      acc.fileName = { author: creator, length: nameLength };
    }

    const pathLength = file.path?.length || 0;
    if (creator && pathLength > acc.filePath.length) {
      acc.filePath = { author: creator, length: pathLength };
    }

    return acc;
  }, {
    filePath: { author: '', length: 0 },
    fileName: { author: '', length: 0 },
    sitnik: { author: '', milliseconds: Infinity },
  });

  const addedFolders: Ranking = Object
    .entries(statisticsByFiles.tree?.addedFoldersByAuthor || {})
    .map(([author, folders]: [string, string[]]) => [author, folders?.length || 0])
    .sort((a, b) => b[1] - a[1]);

  addAwardForTop(result, rankingFromMap(buckets.fileRush), 'fileRush');
  addAwardForTop(result, addedFolders, 'moreAddedFolders');
  addAwardForTop(result, rankingFromMap(buckets.moreLintHint), 'moreLintHint');
  addAwardForTop(result, rankingFromMap(buckets.moreReadMe), 'moreReadMe');
  addAwardForTop(result, rankingFromMap(buckets.moreStyle), 'moreStyle');
  addAwardForTop(result, rankingFromMap(buckets.moreTests), 'moreTests');
  addAwardForTop(result, rankingFromMap(buckets.moreDevOps), 'moreDevOps');
  addAward(result, longest.filePath.author, 'longFilePath');
  addAward(result, longest.fileName.author, 'longFileName');
  addAward(result, longest.sitnik.author, 'publicitySitnik');

  return result;
}
