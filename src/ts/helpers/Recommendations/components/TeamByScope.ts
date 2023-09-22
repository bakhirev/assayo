import { getMoney } from 'ts/helpers/formatter';
import localization  from 'ts/helpers/Localization';

export default class RecommendationsTeamByScope {
  getTotalInfo(dataGrip: any) {
    const money = getMoney(dataGrip.team.statistic.moneyWorked);
    return [
      this.getBusFactor(dataGrip),
      this.getManyTypes(dataGrip),
      this.getParallelism(dataGrip),
      [money, localization.get('recommendations.scope.money'), 'fact'],
      [
        localization.get('recommendations.scope.plan.title'),
        localization.get('recommendations.scope.plan.description'),
        'info',
      ],
      [
        localization.get('recommendations.scope.cost.title'),
        localization.get('recommendations.scope.cost.description'),
        'info',
      ],
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

    if (parallelism < 1.3) return [
      localization.get('recommendations.scope.parallelism.not.title'),
      localization.get('recommendations.scope.parallelism.not.description'),
      'fact',
    ];

    if (parallelism < 2) return [
      localization.get('recommendations.scope.parallelism.has.title'),
      localization.get('recommendations.scope.parallelism.has.description'),
      'fact',
    ];

    return [
      localization.get('recommendations.scope.parallelism.every.title'),
      localization.get('recommendations.scope.parallelism.every.description'),
      'fact',
    ];
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
    if (everyHasOne) return [
      localization.get('recommendations.scope.bus.everyHasOne.title'),
      localization.get('recommendations.scope.bus.everyHasOne.description'),
      'warning',
    ];

    return [
      oneMaintainer,
      localization.get('recommendations.scope.bus.oneMaintainer'),
      'error',
    ];
  }

  getManyTypes(dataGrip: any) {
    if (dataGrip.scope.list.length < 3) return null;

    const oneType = dataGrip.scope.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.type.list.some((type: string) => statistic.types[type] >= limit);
    }).map((statistic: any) => statistic.scope);

    const everyHasOne = oneType.length > dataGrip.scope.statistic.length * 0.6;
    if (everyHasOne) return [
      localization.get('recommendations.scope.types.process.title'),
      [
        localization.get('recommendations.scope.types.process.description'),
        localization.get('recommendations.scope.types.common'),
      ].join('\n'),
      'warning',
    ];

    return [
      oneType,
      [
        localization.get('recommendations.scope.types.one'),
        localization.get('recommendations.scope.types.common'),
      ].join('\n'),
      'warning',
    ];
  }
}
