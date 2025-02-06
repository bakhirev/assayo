import { getBuilder } from '../helpers';

const { getItem } = getBuilder('hour');

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

    if (workAndWeekends > 0.45) return getItem('onlyWork');
    if (workAndWeekends > 0.2) return getItem('weekends');
    if (workAndWeekends > 0) return getItem('easy');

    return null;
  }
}


