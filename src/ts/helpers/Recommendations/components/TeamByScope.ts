import { getMoney } from 'ts/helpers/formatter';
import { getBuilder } from '../helpers';

const { getItem, getTitle } = getBuilder('scope');

export default class RecommendationsTeamByScope {
  getTotalInfo(dataGrip: any) {
    const money = getMoney(dataGrip.team.statistic.moneyWorked);
    return [
      this.getBusFactor(dataGrip),
      this.getManyTypes(dataGrip),
      this.getParallelism(dataGrip),
      getTitle('money', money),
      getItem('plan'),
      getItem('cost'),
    ].filter(item => item);
  }

  getParallelism(dataGrip: any) {
    if (dataGrip.author.list.length < 3
      || dataGrip.scope.list.length < 3) return null;

    const data: number[] = [];
    dataGrip.scope.statistic.forEach((statistic: any) => {
      let total = 0;
      dataGrip.author.list.forEach((name: string) => {
        total += statistic.authors[name]?.days || 0;
      });
      data.push(total / statistic.days);
    });

    const total = data.reduce((sum, value) => sum + value, 0);
    const parallelism = total / data.length;

    if (parallelism < 1.3) return getItem('parallelismNot');
    if (parallelism < 2) return getItem('parallelismHas');

    return getItem('parallelismEvery');
  }

  getBusFactor(dataGrip: any) {
    if (dataGrip.author.list.length < 3
      || dataGrip.scope.list.length < 3) return null;

    const oneMaintainer = dataGrip.scope.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.author.list.some((name: string) => statistic.authors[name]?.commits >= limit);
    }).map((statistic: any) => statistic.scope);

    if (!oneMaintainer.length) return null;
    const everyHasOne = oneMaintainer.length > dataGrip.scope.statistic.length * 0.6;

    return everyHasOne
      ? getItem('busEveryHasOne')
      : getTitle('busOneMaintainer', oneMaintainer);
  }

  getManyTypes(dataGrip: any) {
    if (dataGrip.scope.list.length < 3) return null;

    const oneType = dataGrip.scope.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.type.list.some((type: string) => statistic.types[type] >= limit);
    }).map((statistic: any) => statistic.scope);

    const everyHasOne = oneType.length > dataGrip.scope.statistic.length * 0.6;

    return everyHasOne
      ? getItem('typesProcess')
      : getTitle('typesOne', oneType);
  }
}
