import { getDateByTimestamp } from 'ts/helpers/formatter';
import { getBuilder } from '../helpers';

const {
  getItem,
  getArgTitle,
  getTitleArgDescription,
} = getBuilder('timestamp');

export default class RecommendationsTeamByTimestamp {
  getTotalInfo(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return [];

    const byTimestamp = dataGrip.timestamp.statistic;
    const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
    const totalDays = byTimestamp.allCommitsByTimestamp.length;
    // TODO: all days не верный, я вывожу рабочие дни, а не выходные.

    return [
      (workInWeek ? getArgTitle('weekendDays', [workInWeek]) : null),
      this.getWorkOnWeek(byTimestamp.allCommitsByTimestamp.length, workInWeek),
      getArgTitle('allDays', [totalDays]),
      this.getFirstDay(byTimestamp),
      this.getLastDay(byTimestamp),
    ].filter(item => item);
  }

  getWorkOnWeek(allWorkDays: number, workOnWeek: number) {
    const percent = (workOnWeek * 100) / allWorkDays;
    if (percent > 13) return getItem('regularWeekendWord');
    if (percent > 7) return getItem('sometimeWeekendWord');
    if (percent > 2) return getItem('neverWeekendWord');
    return null;
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return getTitleArgDescription('firstCommit', date, [day]);
  }

  getLastDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return getTitleArgDescription('lastCommit', date, [day]);
  }
}
