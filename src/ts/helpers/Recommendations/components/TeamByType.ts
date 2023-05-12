import localization  from 'ts/helpers/Localization';

export default class RecommendationsTeamByType {
  getTotalInfo(dataGrip: any) {
    return [
      this.getBusFactor(dataGrip),
    ].filter(item => item);
  }

  getBusFactor(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return null;

    const oneMaintainer = dataGrip.type.statistic.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return dataGrip.author.list.some((name: string) => statistic.commitsByAuthors[name] >= limit);
    }).map((statistic: any) => statistic.type);

    if (!oneMaintainer.length) return null;
    const everyHasOne = oneMaintainer.length > dataGrip.type.statistic.length * 0.6;

    if (everyHasOne) return [
      localization.get('recommendations.type.everyHasOne.title'),
      [
        localization.get('recommendations.type.everyHasOne.description'),
        localization.get('recommendations.type.common'),
      ].join('\n'),
      'warning',
    ];

    return [
      localization.get('recommendations.type.oneMaintainer.title'),
      [
        localization.get('recommendations.type.oneMaintainer.description'),
        `- ${oneMaintainer.join(';\n- ')}`,
        localization.get('recommendations.type.common'),
      ].join('\n'),
      'error',
    ];
  }
}


