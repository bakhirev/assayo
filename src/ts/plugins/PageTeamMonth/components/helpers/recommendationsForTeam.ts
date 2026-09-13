import { getBuilder, getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { getDateByTimestamp } from 'ts/helpers/formatter';

import { RECOMMENDATIONS } from './contstants';

const {
  getItem,
  getArgTitle,
  getTitleArgDescription,
} = getBuilder(RECOMMENDATIONS);

function getWorkOnWeek(allWorkDays: number, workOnWeek: number) {
  const percent = (workOnWeek * 100) / allWorkDays;
  if (percent > 13) return getItem('regularWeekendWord');
  if (percent > 7) return getItem('sometimeWeekendWord');
  if (percent > 2) return getItem('neverWeekendWord');
  return null;
}

function getFirstDay(byTimestamp: any) {
  const commit = byTimestamp.allCommitsByTimestamp[0];
  const [ date, day ] = getDateByTimestamp(commit.timestamp);
  return getTitleArgDescription('firstCommit', date, { day });
}

function getLastDay(byTimestamp: any) {
  const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
  const [ date, day ] = getDateByTimestamp(commit.timestamp);
  return getTitleArgDescription('lastCommit', date, { day });
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  if (statisticsByCommits.author.list.length < 2) return [];

  const byTimestamp = statisticsByCommits.timestamp.totalInfo;
  const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
  const totalDays = byTimestamp.allCommitsByTimestamp.length;
  // TODO: all days не верный, я вывожу рабочие дни, а не выходные.

  return [
    (workInWeek ? getArgTitle('weekendDays', { days: workInWeek }) : null),
    getWorkOnWeek(byTimestamp.allCommitsByTimestamp.length, workInWeek),
    getArgTitle('allDays', { days: totalDays }),
    getFirstDay(byTimestamp),
    getLastDay(byTimestamp),
  ].filter(item => item);
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
