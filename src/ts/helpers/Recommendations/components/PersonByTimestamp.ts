import { getDateByTimestamp } from 'ts/helpers/formatter';
import { getBuilder } from '../helpers';

const {
  getArgTitle,
  getTitleArgDescription,
} = getBuilder('timestamp');

export default class RecommendationsPersonByTimestamp {
  getTotalInfo(statisticsByCommits: any) {
    return statisticsByCommits.author.list.reduce((acc: any, name: string) => {
      const byTimestamp = statisticsByCommits.timestamp.totalInfoByName[name];
      const byAuthor = statisticsByCommits.author.totalInfoByName.get(name);
      const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
      acc[name] = [];

      if (workInWeek) {
        acc[name].push(getArgTitle('totalDaysWithCommits', [workInWeek]));
      }

      if (byAuthor.daysLosses) {
        acc[name].push(getArgTitle('totalDaysWithoutCommits', [byAuthor.daysLosses]));
      }

      acc[name].push(getArgTitle('totalDays', [byAuthor.daysAll]));

      acc[name].push(this.getFirstDay(byTimestamp));

      acc[name].push(this.getLastDay(byTimestamp));

      return acc;
    }, {});
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [date, day] = getDateByTimestamp(commit.timestamp);
    return getTitleArgDescription('firstCommit', date, [day]);
  }

  getLastDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
    const [date, day] = getDateByTimestamp(commit.timestamp);
    return getTitleArgDescription('lastCommit', date, [day]);
  }
}
