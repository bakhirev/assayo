import { getBuilder } from '../helpers';

const { getItem, getTitle } = getBuilder('week');

export default class RecommendationsTeamByWeek {
  getTotalInfo(statisticsByCommits: any) {
    if (statisticsByCommits.author.list.length < 2) return [];

    const lastWeek = statisticsByCommits.week.totalInfo.slice(0, 3);
    return [
      this.getLazyDays(statisticsByCommits, lastWeek),
      this.getTasks(statisticsByCommits, lastWeek),
      // this.getLazyMaintainer(statisticsByCommits, lastWeek),
    ].filter(item => item);
  }

  getLazyDays(statisticsByCommits: any, lastWeek: any) {
    const lazyDays = lastWeek.map((statistic: any) => statistic.lazyDaysTotal / statistic.authorsLength);
    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return getItem('lazyDaysDown');
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return getItem('lazyDaysUp');
    }
    return null;
  }

  getTasks(statisticsByCommits: any, lastWeek: any) { // TODO: спорно, это видно по количеству изменений
    const lazyDays = lastWeek.map((statistic: any) => statistic.tasks / statistic.authorsLength);
    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return getItem('taskUp');
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return getItem('taskDown');
    }
    return null;
  }

  getLazyMaintainer(statisticsByCommits: any, lastWeek: any) {
    const lazyMaintainer = lastWeek.map((statistic: any) =>
      Object.entries(statistic.lazyDays)
        .sort((a: any, b: any) => a[1] - b[1]).pop()?.[0],
    );
    // TODO: неверный расчет
    // нужен человек, который встречается в трех массивах лидеров прогула
    if (lazyMaintainer[0] === lazyMaintainer[1] === lazyMaintainer[2]) {
      return getTitle('taskLazyMaintainer', lazyMaintainer[0]);
    }

    return null;
  }
}
