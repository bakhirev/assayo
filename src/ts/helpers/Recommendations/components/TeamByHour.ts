import { getBuilder } from '../helpers';

const { getItem } = getBuilder('hour');

export default class RecommendationsTeamByHour {
  getTotalInfo(statisticsByCommits: any) {
    if (statisticsByCommits.author.list.length < 2) return [];

    const statistic = statisticsByCommits.team.totalInfo;

    return [
      this.getWeekIsWork(statistic),
    ].filter(item => item);
  }

  getWeekIsWork(statistic: any) {
    const weekday = Math.min(...statistic.commitsByDay.slice(0, 5));
    const weekends = Math.max(...statistic.commitsByDay.slice(5, 7));
    const workAndWeekends = weekends / weekday;

    if (workAndWeekends > 0.45) return getItem('onlyWork');
    if (workAndWeekends > 0.2) return getItem('weekends');
    if (workAndWeekends > 0) return getItem('easy');

    return null;
  }
}


