import { getBuilder, getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { getDateByTimestamp } from 'ts/helpers/formatter';

import { RECOMMENDATIONS } from './contstants';

const {
  getArgTitle,
  getTitleArgDescription,
} = getBuilder(RECOMMENDATIONS);

function getFirstDay(byTimestamp: any) {
  const commit = byTimestamp.allCommitsByTimestamp[0];
  const [date, day] = getDateByTimestamp(commit.timestamp);
  return getTitleArgDescription('firstCommit', date, { day });
}

function getLastDay(byTimestamp: any) {
  const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
  const [date, day] = getDateByTimestamp(commit.timestamp);
  return getTitleArgDescription('lastCommit', date, { day });
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  return statisticsByCommits.author.list.reduce((acc: any, name: string) => {
    const byTimestamp = statisticsByCommits.timestamp.totalInfoByName[name];
    const byAuthor = statisticsByCommits.author.totalInfoByName.get(name);
    const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
    acc[name] = [];
    // TODO: не работает, починить
    if (workInWeek) {
      // acc[name].push(getArgTitle('totalDaysWithCommits', [workInWeek]));
    }

    if (byAuthor.daysLosses) {
      // acc[name].push(getArgTitle('totalDaysWithoutCommits', [byAuthor.daysLosses]));
    }

    // acc[name].push(getArgTitle('totalDays', [byAuthor.daysAll]));
    acc[name].push(getFirstDay(byTimestamp));
    acc[name].push(getLastDay(byTimestamp));

    return acc;
  }, {});
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
