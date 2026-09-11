import { getBuilder, getWrapperWithCache } from 'ts/helpers/recom';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { RECOMMENDATIONS } from './contstants';

const { getItem, getTitle } = getBuilder(RECOMMENDATIONS);

function getLazyDays(lastWeek: any) {
  const lazyDays = lastWeek.map((statistic: any) => statistic.lazyDaysTotal / statistic.authorsLength);
  if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
    return getItem('lazyDaysDown');
  }
  if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
    return getItem('lazyDaysUp');
  }
  return null;
}

function getTasks(lastWeek: any) { // TODO: спорно, это видно по количеству изменений
  const lazyDays = lastWeek.map((statistic: any) => statistic.tasks / statistic.authorsLength);
  if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
    return getItem('taskUp');
  }
  if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
    return getItem('taskDown');
  }
  return null;
}

function getLazyMaintainer(lastWeek: any) {
  const lazyMaintainer = lastWeek.map((statistic: any) =>
    Object.entries(statistic.lazyDays)
      .sort((a: any, b: any) => a[1] - b[1]).pop()?.[0],
  );
  // TODO: неверный расчет
  // нужен человек, который встречается в трех массивах лидеров прогула
  if (lazyMaintainer[0] === lazyMaintainer[1] === lazyMaintainer[2]) {
    return getTitle('taskLazyMaintainer', lazyMaintainer[0]);
  }

  return null;
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  if (statisticsByCommits.author.list.length < 2) return [];

  const lastWeek = statisticsByCommits.week.totalInfo.slice(0, 3);
  return [
    getLazyDays(lastWeek),
    getTasks(lastWeek),
    // getLazyMaintainer(lastWeek),
  ].filter(item => item);
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
