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
      return ['Стало меньше прогулов', 'за последние три недели этот показатель упал', 'fact'];
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return ['Стало больше прогулов', 'нет задач или нужен более жесткий контроль', 'error'];
    }
    return null;
  }

  getTasks(dataGrip: any, lastWeek: any) { // TODO: спорно, это видно по количеству изменений
    const lazyDays = lastWeek.map((statistic: any) => statistic.tasks / statistic.authorsLength);
    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return ['Растёт производительность', 'или задачи стали слишком мелкие. Нужно проверить. Если гранулярность та же - закрепить результат.', 'fact'];
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return ['Падает производительность', 'или задачи хуже разбивают. Нужно проверить. Если гранулярность та же - взять на контроль.', 'error'];
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
    return lazyMaintainer[0] === lazyMaintainer[1] === lazyMaintainer[2]
      ? [lazyMaintainer[0], 'стабильный лидер по прогулам. Уволить?', 'error']
      : null;
  }
}


