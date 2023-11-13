import { getMoney } from 'ts/helpers/formatter';
import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsTeamByScope {
  getTotalInfo(dataGrip: any) {
    const money = getMoney(dataGrip.team.statistic.moneyWorked);
    return [
      this.getBusFactor(dataGrip),
      this.getManyTypes(dataGrip),
      this.getParallelism(dataGrip),
      {
        title: money,
        description: 'recommendations.scope.money',
        type: RECOMMENDATION_TYPES.FACT,
      },
      {
        title: 'recommendations.scope.plan.title',
        description: 'recommendations.scope.plan.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.scope.cost.title',
        description: 'recommendations.scope.cost.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
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

    if (parallelism < 1.3) return {
      title: 'recommendations.scope.parallelism.not.title',
      description: 'recommendations.scope.parallelism.not.description',
      type: RECOMMENDATION_TYPES.FACT,
    };

    if (parallelism < 2) return {
      title: 'recommendations.scope.parallelism.has.title',
      description: 'recommendations.scope.parallelism.has.description',
      type: RECOMMENDATION_TYPES.FACT,
    };

    return {
      title: 'recommendations.scope.parallelism.every.title',
      description: 'recommendations.scope.parallelism.every.description',
      type: RECOMMENDATION_TYPES.FACT,
    };
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

    if (everyHasOne) return {
      title: 'recommendations.scope.bus.everyHasOne.title',
      description: 'recommendations.scope.bus.everyHasOne.description',
      type: RECOMMENDATION_TYPES.WARNING,
    };

    return {
      title: oneMaintainer,
      description: 'recommendations.scope.bus.oneMaintainer',
      type: RECOMMENDATION_TYPES.ALERT,
    };
  }

  getManyTypes(dataGrip: any) {
    if (dataGrip.scope.list.length < 3) return null;

    const oneType = dataGrip.scope.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.type.list.some((type: string) => statistic.types[type] >= limit);
    }).map((statistic: any) => statistic.scope);

    const everyHasOne = oneType.length > dataGrip.scope.statistic.length * 0.6;

    if (everyHasOne) return {
      title: 'recommendations.scope.types.process.title',
      description: [
        'recommendations.scope.types.process.description',
        'recommendations.scope.types.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    };

    return {
      title: oneType,
      description: [
        'recommendations.scope.types.one',
        'recommendations.scope.types.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    };
  }
}
