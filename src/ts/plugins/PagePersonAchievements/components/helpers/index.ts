import { getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import getAchievementsByCompetition from './byCompetition';

function getTotalInfo() {
  return getAchievementsByCompetition(
    statisticStore.statisticsByCommits,
    statisticStore.statisticsByFiles,
  );
}

export default getWrapperWithCache(getTotalInfo);
