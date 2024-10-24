import RECOMMENDATION_TYPES from '../contstants';

export default class RecommendationsTeamByType {
  getTotalInfo(dataGrip: any) {
    const fewTypes = dataGrip.type.statistic.filter((statistic: any) => (
      statistic.tasks > 20
    )).length < 7;

    return [
      this.getBusFactor(dataGrip),
      (fewTypes ? {
        title: 'recommendations.type.fewTypes.title',
        description: 'recommendations.type.fewTypes.description',
        type: RECOMMENDATION_TYPES.FACT,
      } : null),
      {
        title: 'recommendations.type.diff.title',
        description: 'recommendations.type.diff.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.type.buddy.title',
        description: 'recommendations.type.buddy.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
    ].filter(item => item);
  }

  getBusFactor(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return null;
    if (dataGrip.type.statistic.length > 200) return null; // for performance

    // TODO: bad performance
    const oneMaintainer = dataGrip.type.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.author.list.some((name: string) => statistic.commitsByAuthors[name] >= limit);
    }).map((statistic: any) => statistic.type);

    if (!oneMaintainer.length) return null;
    const everyHasOne = oneMaintainer.length > dataGrip.type.statistic.length * 0.6;

    if (everyHasOne) return {
      title: 'recommendations.type.everyHasOne.title',
      description: [
        'recommendations.type.everyHasOne.description',
        'recommendations.type.common',
      ],
      type: RECOMMENDATION_TYPES.WARNING,
    };

    return {
      title: 'recommendations.type.oneMaintainer.title',
      description: [
        'recommendations.type.oneMaintainer.description',
        'recommendations.type.common',
      ],
      type: RECOMMENDATION_TYPES.ALERT,
      arguments: {
        description: [`- ${oneMaintainer.join(';\n- ')}`],
      },
    };
  }
}


