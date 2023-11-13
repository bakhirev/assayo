import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsTeamByHour {
  getTotalInfo(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return [];

    const statistic = dataGrip.team.statistic;

    return [
      this.getWeekIsWork(statistic),
    ].filter(item => item);
  }

  getWeekIsWork(statistic: any) {
    const weekday = Math.min(...statistic.commitsByDayAndHourTotal.slice(0, 5));
    const weekends = Math.max(...statistic.commitsByDayAndHourTotal.slice(5, 7));
    const workAndWeekends = weekends / weekday;

    if (workAndWeekends > 0.45) return {
      title: 'recommendations.hour.onlyWork.title',
      description: 'recommendations.hour.onlyWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    if (workAndWeekends > 0.2) return {
      title: 'recommendations.hour.weekends.title',
      description: 'recommendations.hour.weekends.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    if (workAndWeekends > 0) return {
      title: 'recommendations.hour.easy.title',
      description: 'recommendations.hour.easy.description',
      type: RECOMMENDATION_TYPES.WARNING,
    };

    return null;
  }
}


