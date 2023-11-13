import { getDateByTimestamp } from 'ts/helpers/formatter';
import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsTeamByTimestamp {
  getTotalInfo(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return [];

    const byTimestamp = dataGrip.timestamp.statistic;
    const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
    const totalDays = byTimestamp.allCommitsByTimestamp.length;
    // TODO: all days не верный, я вывожу рабочие дни, а не выходные.

    return [
      (workInWeek ? {
        title: 'recommendations.timestamp.common.title',
        description: 'recommendations.timestamp.weekendDays.description',
        type: RECOMMENDATION_TYPES.ALERT,
        arguments: {
          title: [workInWeek],
        },
      } : null),

      this.getWorkOnWeek(byTimestamp.allCommitsByTimestamp.length, workInWeek),

      {
        title: 'recommendations.timestamp.common.title',
        description: 'recommendations.timestamp.allDays.description',
        type: RECOMMENDATION_TYPES.FACT,
        arguments: {
          title: [totalDays],
        },
      },

      this.getFirstDay(byTimestamp),
      this.getLastDay(byTimestamp),
    ].filter(item => item);
  }

  getWorkOnWeek(allWorkDays: number, workOnWeek: number) {
    const percent = (workOnWeek * 100) / allWorkDays;

    if (percent > 13) {
      return {
        title: 'recommendations.timestamp.regularWeekendWord.title',
        description: 'recommendations.timestamp.weekendWord.description',
        type: RECOMMENDATION_TYPES.ALERT,
      };
    }

    if (percent > 7) {
      return {
        title: 'recommendations.timestamp.sometimeWeekendWord.title',
        description: 'recommendations.timestamp.weekendWord.description',
        type: RECOMMENDATION_TYPES.ALERT,
      };
    }

    if (percent > 2) {
      return {
        title: 'recommendations.timestamp.neverWeekendWord.title',
        description: 'recommendations.timestamp.neverWeekendWord.description',
        type: RECOMMENDATION_TYPES.FACT,
      };
    }

    return null;
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);

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
    const [ date, day ] = getDateByTimestamp(commit.timestamp);

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


