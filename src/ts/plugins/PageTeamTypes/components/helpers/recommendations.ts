import { getBuilder, getWrapperWithCache } from 'ts/helpers/recom';
import statisticStore from 'ts/store/StatisticsByCommitsStore';

import { RECOMMENDATIONS } from './contstants';

const { getItem, getArgDescription } = getBuilder(RECOMMENDATIONS);

function getBusFactor(statisticsByCommits: any) {
  if (statisticsByCommits.author.list.length < 2) return null;
  if (statisticsByCommits.type.totalInfo.length > 200) return null; // for performance

  // TODO: bad performance
  const oneMaintainer = statisticsByCommits.type.totalInfo.filter((statistic: any) => {
    const limit = statistic.commits * 0.8;
    return statisticsByCommits.author.list.some((name: string) => statistic.commitsByAuthors[name] >= limit);
  }).map((statistic: any) => statistic.type);

  if (!oneMaintainer.length) return null;
  const everyHasOne = oneMaintainer.length > statisticsByCommits.type.totalInfo.length * 0.6;

  return everyHasOne
    ? getItem('everyHasOne')
    : getArgDescription('oneMaintainer', [`- ${oneMaintainer.join(';\n- ')}`]);
}

function getTotalInfo() {
  const statisticsByCommits = statisticStore.statisticsByCommits;
  const fewTypes = statisticsByCommits.type.totalInfo.filter((statistic: any) => (
    statistic.tasks > 20
  )).length < 7;

  return [
    getBusFactor(statisticsByCommits),
    (fewTypes ? getItem('fewTypes') : null),
    getItem('diff'),
    getItem('buddy'),
  ].filter(item => item);
}

const getRecommendations = getWrapperWithCache(getTotalInfo);

export default getRecommendations;
