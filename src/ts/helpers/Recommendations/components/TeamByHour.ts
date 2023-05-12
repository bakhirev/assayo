import localization  from 'ts/helpers/Localization';

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

    if (workAndWeekends > 0.45) return [
      localization.get('recommendations.hour.onlyWork.title'),
      localization.get('recommendations.hour.onlyWork.description'),
      'error',
    ];
    if (workAndWeekends > 0.2) return [
      localization.get('recommendations.hour.weekends.title'),
      localization.get('recommendations.hour.weekends.description'),
      'error',
    ];
    if (workAndWeekends > 0) return [
      localization.get('recommendations.hour.easy.title'),
      localization.get('recommendations.hour.easy.description'),
      'warning',
    ];
    return null;
  }
}


