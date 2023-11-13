import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsTeamByWeek {
  getTotalInfo(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return [];

    const lastWeek = dataGrip.week.statistic.slice(0, 3);
    return [
      this.getLazyDays(dataGrip, lastWeek),
      this.getTasks(dataGrip, lastWeek),
      // this.getLazyMaintainer(dataGrip, lastWeek),
    ].filter(item => item);
  }

  getLazyDays(dataGrip: any, lastWeek: any) {
    const lazyDays = lastWeek.map((statistic: any) => statistic.lazyDaysTotal / statistic.authorsLength);

    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return {
        title: 'recommendations.week.lazyDays.down.title',
        description: 'recommendations.week.lazyDays.down.description',
        type: RECOMMENDATION_TYPES.FACT,
      };
    }

    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return {
        title: 'recommendations.week.lazyDays.up.title',
        description: 'recommendations.week.lazyDays.up.description',
        type: RECOMMENDATION_TYPES.ALERT,
      };
    }

    return null;
  }

  getTasks(dataGrip: any, lastWeek: any) { // TODO: спорно, это видно по количеству изменений
    const lazyDays = lastWeek.map((statistic: any) => statistic.tasks / statistic.authorsLength);

    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return {
        title: 'recommendations.week.task.up.title',
        description: 'recommendations.week.task.up.description',
        type: RECOMMENDATION_TYPES.FACT,
      };
    }

    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return {
        title: 'recommendations.week.task.down.title',
        description: 'recommendations.week.task.down.description',
        type: RECOMMENDATION_TYPES.ALERT,
      };
    }

    return null;
  }

  getLazyMaintainer(dataGrip: any, lastWeek: any) {
    const lazyMaintainer = lastWeek.map((statistic: any) =>
      Object.entries(statistic.lazyDays)
        .sort((a: any, b: any) => a[1] - b[1]).pop()?.[0],
    );
    // TODO: неверный расчет
    // нужен человек, который встречается в трех массивах лидеров прогула
    if (lazyMaintainer[0] === lazyMaintainer[1] === lazyMaintainer[2]) {
      return {
        title: lazyMaintainer[0],
        description: 'recommendations.week.task.lazyMaintainer.description',
        type: RECOMMENDATION_TYPES.ALERT,
      };
    }

    return null;
  }
}


