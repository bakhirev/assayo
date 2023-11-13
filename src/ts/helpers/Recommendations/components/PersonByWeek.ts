import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsPersonByWeek {
  getTotalInfo(dataGrip: any) {
    const lastWeeks = dataGrip.week.statistic.slice(0, 3);
    return dataGrip.author.list.reduce((acc: any, name: string) => {
      acc[name] = [
        this.getLazyDays(lastWeeks, name),
        this.getNotWork(lastWeeks, name),
        this.getUpWork(lastWeeks, name),
        this.getTasks(lastWeeks, name),
      ].filter(item => item);
      return acc;
    }, {});
  }

  getLazyDays(lastWeeks: any[], name: string) {
    const lazyDays = lastWeeks.map(statistic => statistic.lazyDays[name]);

    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) return {
      title: 'recommendations.week.lazyDays.down.title',
      description: 'recommendations.week.lazyDays.down.description',
      type: RECOMMENDATION_TYPES.FACT,
    };

    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) return {
      title: 'recommendations.week.lazyDays.up.title',
      description: 'recommendations.week.lazyDays.up.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    return null;
  }

  getNotWork(lastWeeks: any[], name: string) {
    const lazyDays = lastWeeks.map(statistic => statistic.lazyDays[name]);

    if (lazyDays[0] && lazyDays[1] && lazyDays[2]) return {
      title: 'recommendations.week.notWork.title',
      description: 'recommendations.week.notWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    return null;
  }

  getUpWork(lastWeeks: any[], name: string) {
    const weekDays = lastWeeks.map(statistic => statistic.weekDays[name]);

    if (weekDays[0] && weekDays[1] && weekDays[2]) return {
      title: 'recommendations.week.upWork.title',
      description: 'recommendations.week.upWork.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    return null;
  }

  getTasks(lastWeeks: any[], name: string) { // TODO: спорно, это видно по количеству изменений
    const lazyDays = lastWeeks.map(statistic => statistic.taskInDay[name]);

    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) return {
      title: 'recommendations.week.task.up.title',
      description: 'recommendations.week.task.up.description',
      type: RECOMMENDATION_TYPES.FACT,
    };

    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) return {
      title: 'recommendations.week.task.down.title',
      description: 'recommendations.week.task.down.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    return null;
  }
}


