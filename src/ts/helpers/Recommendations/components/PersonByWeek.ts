import { getBuilder } from '../helpers';

const { getItem } = getBuilder('week');

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
    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return getItem('lazyDaysDown');
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return getItem('lazyDaysUp');
    }
    return null;
  }

  getNotWork(lastWeeks: any[], name: string) {
    const lazyDays = lastWeeks.map(statistic => statistic.lazyDays[name]);
    if (lazyDays[0] && lazyDays[1] && lazyDays[2]) {
      return getItem('notWork');
    }
    return null;
  }

  getUpWork(lastWeeks: any[], name: string) {
    const weekDays = lastWeeks.map(statistic => statistic.weekDays[name]);
    if (weekDays[0] && weekDays[1] && weekDays[2]) {
      return getItem('upWork');
    }
    return null;
  }

  getTasks(lastWeeks: any[], name: string) { // TODO: спорно, это видно по количеству изменений
    const lazyDays = lastWeeks.map(statistic => statistic.taskInDay[name]);
    if (lazyDays[0] < lazyDays[1] && lazyDays[1] < lazyDays[2]) {
      return getItem('taskUp');
    }
    if (lazyDays[0] > lazyDays[1] && lazyDays[1] > lazyDays[2]) {
      return getItem('taskDown');
    }
    return null;
  }
}
