import IHashMap from 'ts/interfaces/HashMap';

import getAchievementByAuthor from './byAuthor';
import getAchievementByFile from './byFile';

type Ranking = [string, number][];
type PrStats = {
  numberMergedPr: number;
  maxDelayDays: number;
};

const REF_PROPERTY_ACHIVMENT: Array<[string, string?, string?]> = [
  ['nameLength', 'longestName', 'shortestName'],
  ['messageLength', 'longestMessage'],
  ['midMessageLength', 'everyMessageLong', 'everyMessageShort'],
  ['tasks', 'moreTasks', 'lessTasks'],
  ['days', 'moreWorkDays', 'lessWorkDays'],
  ['lazyDays', 'moreLazyDays', 'lessLazyDays'],
  ['allDaysInProject', 'moreDaysInProject', 'lessDaysInProject'],
  ['firstCommit', undefined, 'adam'],
  ['moreRefactoring', 'moreRefactoring'],
  ['tasksInDay', 'moreTasksInDay'],
  ['commitsInDay', 'moreCommits'],
  ['morePRMerge', 'morePRMerge'],
  ['moreLongWaitPR', 'moreLongWaitPR'],
  ['manyTimeZone', 'moreChangeTimeZone'],
];

function getPrStatsByAuthor(prList: any[] = []) {
  return prList.reduce((map, pr) => {
    if (!pr?.author) return map;
    const prev = map.get(pr.author) || { numberMergedPr: 0, maxDelayDays: 0 };
    prev.numberMergedPr += 1;
    prev.maxDelayDays = Math.max(prev.maxDelayDays, pr.daysInReview || 0);
    map.set(pr.author, prev);
    return map;
  }, new Map<string, PrStats>());
}

function getLongestTaskByAuthor(tasks: any[] = []) {
  return tasks.reduce((map, task) => {
    const days = task.totalDays || 0;
    if (!task.authors || !days) return map;
    task.authors.forEach((author: string) => {
      map.set(author, Math.max(map.get(author) || 0, days));
    });
    return map;
  }, new Map<string, number>());
}

function getAuthorMetrics(statistic: any, statisticsByCommits: any, prByAuthor: Map<string, PrStats>) {
  const byTimestamp = statisticsByCommits.timestamp?.totalInfoByName?.[statistic.author];
  const byPr = prByAuthor.get(statistic.author);
  const timezones = (statistic.countries || [])
    .filter((country: any) => country.fromTimezone && country.fromTimezone !== '+00:00')
    .length;

  const metrics: IHashMap<number> = {
    nameLength: statistic.author?.length || 0,
    messageLength: statistic.maxMessageLength || 0,
    midMessageLength: statistic.middleMessageLength || 0,
    tasks: statistic.totalTasks || 0,
    days: statistic.totalDaysWithCommits || 0,
    moreRefactoring: statistic.types?.refactor || 0,
    manyTimeZone: timezones,
    tasksInDay: byTimestamp?.tasksByTimestampCounter?.max || 0,
    commitsInDay: byTimestamp?.commitsByTimestampCounter?.max || 0,
    moreLongWaitPR: byPr?.maxDelayDays || 0,
    morePRMerge: byPr?.numberMergedPr || 0,
  };

  if (statistic.isStaff) return metrics;

  metrics.allDaysInProject = statistic.totalDays || 0;
  metrics.lazyDays = statistic.totalDaysWithoutCommits || 0;
  metrics.firstCommit = statistic.firstCommit || 0;
  return metrics;
}

function getRankings(
  statisticByAuthor: any[],
  statisticsByCommits: any,
  prByAuthor: Map<string, PrStats>,
) {
  const total: IHashMap<Ranking> = {};
  statisticByAuthor.forEach((statistic) => {
    Object
      .entries(getAuthorMetrics(statistic, statisticsByCommits, prByAuthor))
      .forEach(([key, value]) => {
        (total[key] ||= []).push([statistic.author, value]);
      });
  });
  Object.values(total).forEach((list) => list.sort((a, b) => b[1] - a[1]));
  return total;
}

function award(
  refAuthorAchievements: IHashMap<string[]>,
  ranking: Ranking = [],
  maxCode?: string,
  minCode?: string,
) {
  const first = ranking[0]?.[0];
  if (!first || !refAuthorAchievements[first]) return;
  if (maxCode) refAuthorAchievements[first].push(maxCode);
  if (!minCode) return;
  const last = ranking[ranking.length - 1]?.[0];
  if (last && refAuthorAchievements[last]) {
    refAuthorAchievements[last].push(minCode);
  }
}

function addAchievement(refAuthorAchievements: IHashMap<string[]>, author: string | undefined, code: string) {
  if (author && refAuthorAchievements[author]) {
    refAuthorAchievements[author].push(code);
  }
}

function awardFirstLastCommit(refAuthorAchievements: IHashMap<string[]>, firstLastCommit: any) {
  const firstAuthor = firstLastCommit?.minData?.author;
  const lastAuthor = firstLastCommit?.maxData?.author;
  if (!firstAuthor || !lastAuthor) return;
  if (firstAuthor === lastAuthor) {
    addAchievement(refAuthorAchievements, firstAuthor, 'firstLastCommit');
    return;
  }
  addAchievement(refAuthorAchievements, firstAuthor, 'firstCommit');
  addAchievement(refAuthorAchievements, lastAuthor, 'lastCommit');
}

function mergeAwards(target: IHashMap<string[]>, extra: IHashMap<string[]>) {
  Object.entries(extra).forEach(([author, codes]) => {
    if (target[author]) target[author].push(...codes);
  });
}

export default function getAchievementsByCompetition(
  statisticsByCommits: any,
  statisticsByFiles: any,
): IHashMap<string[][]> {
  const statisticByAuthor = statisticsByCommits?.author?.totalInfo || [];
  const refAuthorAchievements: IHashMap<string[]> = Object.fromEntries(
    statisticByAuthor.map((statistic: any) => [statistic.author, []]),
  );

  const prByAuthor = getPrStatsByAuthor(statisticsByCommits?.pr?.totalInfo);
  const longestTaskByAuthor = getLongestTaskByAuthor(statisticsByCommits?.tasks?.totalInfo);
  const rankings = getRankings(statisticByAuthor, statisticsByCommits, prByAuthor);

  REF_PROPERTY_ACHIVMENT.forEach(([metric, maxCode, minCode]) => {
    award(refAuthorAchievements, rankings[metric], maxCode, minCode);
  });

  awardFirstLastCommit(refAuthorAchievements, statisticsByCommits?.firstLastCommit);

  mergeAwards(refAuthorAchievements, getAchievementByFile(statisticsByFiles));

  return Object.fromEntries(
    statisticByAuthor.map((statistic: any) => [
      statistic.author,
      getAchievementByAuthor(
        refAuthorAchievements[statistic.author],
        statistic,
        statisticsByCommits,
        prByAuthor.get(statistic.author),
        longestTaskByAuthor.get(statistic.author) || 0,
      ),
    ]),
  );
}
