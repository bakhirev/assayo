import { getMoney } from 'ts/helpers/formatter';
import { getBuilder } from '../helpers';

const { getItem, getTitle } = getBuilder('scope');

export default class RecommendationsTeamByScope {
  getTotalInfo(statisticsByCommits: any) {
    const money = getMoney(statisticsByCommits.team.totalInfo.moneyWorked);
    return [
      this.getBusFactor(statisticsByCommits),
      this.getManyTypes(statisticsByCommits),
      this.getParallelism(statisticsByCommits),
      getTitle('money', money),
      getItem('plan'),
      getItem('cost'),
    ].filter(item => item);
  }

  getParallelism(statisticsByCommits: any) {
    if (statisticsByCommits.author.list.length < 3
      || statisticsByCommits.scope.list.length < 3) return null;

    const data: number[] = [];
    statisticsByCommits.scope.totalInfo.forEach((statistic: any) => {
      data.push(statistic.totalDaysWorkedByAuthor / statistic.totalDaysWorked);
    });

    const total = data.reduce((sum, value) => sum + value, 0);
    const parallelism = total / data.length;

    if (parallelism < 1.3) return getItem('parallelismNot');
    if (parallelism < 2) return getItem('parallelismHas');

    return getItem('parallelismEvery');
  }

  getBusFactor(statisticsByCommits: any) {
    if (statisticsByCommits.author.list.length < 3
      || statisticsByCommits.scope.list.length < 3) return null;

    const oneMaintainer = statisticsByCommits.scope.totalInfo.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      const commitsByAuthor = Object.values(statistic.commitsByAuthor) as number[];
      return commitsByAuthor.some((commits: number) => commits >= limit);
    }).map((statistic: any) => statistic.scope);

    if (!oneMaintainer.length) return null;
    const everyHasOne = oneMaintainer.length > statisticsByCommits.scope.totalInfo.length * 0.6;

    return everyHasOne
      ? getItem('busEveryHasOne')
      : getTitle('busOneMaintainer', oneMaintainer);
  }

  getManyTypes(statisticsByCommits: any) {
    if (statisticsByCommits.scope.list.length < 3) return null;

    const oneType = statisticsByCommits.scope.totalInfo.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return statisticsByCommits.type.list.some((type: string) => statistic.types[type] >= limit);
    }).map((statistic: any) => statistic.scope);

    const everyHasOne = oneType.length > statisticsByCommits.scope.totalInfo.length * 0.6;

    return everyHasOne
      ? getItem('typesProcess')
      : getTitle('typesOne', oneType);
  }
}
