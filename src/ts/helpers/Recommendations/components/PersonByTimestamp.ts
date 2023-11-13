import { getDateByTimestamp } from 'ts/helpers/formatter';
import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsPersonByTimestamp {
  getTotalInfo(dataGrip: any) {
    return dataGrip.author.list.reduce((acc: any, name: string) => {
      const byTimestamp = dataGrip.timestamp.statisticByAuthor[name];
      const byAuthor = dataGrip.author.statisticByName[name];
      const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
      acc[name] = [];

      if (workInWeek) {
        acc[name].push({
          title: 'recommendations.timestamp.common.title',
          description: 'recommendations.timestamp.weekendDays.description',
          type: RECOMMENDATION_TYPES.ALERT,
          arguments: {
            title: [workInWeek],
          },
        });
      }

      if (byAuthor.daysLosses) {
        acc[name].push({
          title: 'recommendations.timestamp.common.title',
          description: 'recommendations.timestamp.lossesDays.description',
          type: RECOMMENDATION_TYPES.WARNING,
          arguments: {
            title: [byAuthor.daysLosses],
          },
        });
      }

      acc[name].push({
        title: 'recommendations.timestamp.common.title',
        description: 'recommendations.timestamp.allDays.description',
        type: RECOMMENDATION_TYPES.FACT,
        arguments: {
          title: [byAuthor.daysAll],
        },
      });

      acc[name].push(this.getFirstDay(byTimestamp));

      acc[name].push(this.getLastDay(byTimestamp));

      return acc;
    }, {});
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [date, day] = getDateByTimestamp(commit.timestamp);
    return {
      title: date,
      description: 'recommendations.timestamp.firstCommit.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [day],
      },
    };
  }

  getLastDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
    const [date, day] = getDateByTimestamp(commit.timestamp);
    return {
      title: date,
      description: 'recommendations.timestamp.lastCommit.description',
      type: RECOMMENDATION_TYPES.FACT,
      arguments: {
        description: [day],
      },
    };
  }
}


