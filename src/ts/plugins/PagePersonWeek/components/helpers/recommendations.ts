import { getBuilder, getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { RECOMMENDATIONS } from './contstants';

const { getItem } = getBuilder(RECOMMENDATIONS);

function getLazyDays(lastWeeks: any[], name: string) {
  const lazyDays = lastWeeks.map(statistic => statistic.lazyDays[name]);
  if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
    return getItem('lazyDaysDown');
  }
  if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
    return getItem('lazyDaysUp');
  }
  return null;
}

function getNotWork(lastWeeks: any[], name: string) {
  const lazyDays = lastWeeks.map(statistic => statistic.lazyDays[name]);
  if (lazyDays[0] && lazyDays[1] && lazyDays[2]) {
    return getItem('notWork');
  }
  return null;
}

function getUpWork(lastWeeks: any[], name: string) {
  const weekDays = lastWeeks.map(statistic => statistic.weekDays[name]);
  if (weekDays[0] && weekDays[1] && weekDays[2]) {
    return getItem('upWork');
  }
  return null;
}

function getTasks(lastWeeks: any[], name: string) { // TODO: спорно, это видно по количеству изменений
  const lazyDays = lastWeeks.map(statistic => statistic.taskInDay[name]);
  if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
    return getItem('taskUp');
  }
  if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
    return getItem('taskDown');
  }
  return null;
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  const lastWeeks = statisticsByCommits.week.totalInfo.slice(0, 3);
  return statisticsByCommits.author.list.reduce((acc: any, name: string) => {
    acc[name] = [
      getLazyDays(lastWeeks, name),
      getNotWork(lastWeeks, name),
      getUpWork(lastWeeks, name),
      getTasks(lastWeeks, name),
    ].filter(item => item);
    return acc;
  }, {});
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
