import { getBuilder, getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { RECOMMENDATIONS } from './contstants';

const { getItem } = getBuilder(RECOMMENDATIONS);

function getWeekIsWork(statistic: any) {
  const weekday = Math.min(...statistic.commitsByDay.slice(0, 5));
  const weekends = Math.max(...statistic.commitsByDay.slice(5, 7));
  const workAndWeekends = weekends / weekday;

  if (workAndWeekends > 0.45) return getItem('onlyWork');
  if (workAndWeekends > 0.2) return getItem('weekends');
  if (workAndWeekends > 0) return getItem('easy');

  return null;
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  if (statisticsByCommits.author.list.length < 2) return [];

  return [
    getWeekIsWork(statisticsByCommits.team.totalInfo),
  ].filter(item => item);
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
