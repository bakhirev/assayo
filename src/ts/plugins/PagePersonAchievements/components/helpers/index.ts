import { getWrapperWithCache } from 'ts/helpers/recommendations';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import AchievementsByCompetition from './byCompetition';

function getTotalInfo() {
  const achievements = new AchievementsByCompetition();
  achievements.updateByGrip(
    statisticStore.statisticsByCommits,
    statisticStore.statisticsByFiles
  );
  return achievements.authors;
}

const getAchievements = getWrapperWithCache(getTotalInfo);

export default getAchievements;
