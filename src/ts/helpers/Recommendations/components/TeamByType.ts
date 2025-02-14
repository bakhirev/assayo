import { getBuilder } from '../helpers';

const { getItem, getArgDescription } = getBuilder('type');

export default class RecommendationsTeamByType {
  getTotalInfo(dataGrip: any) {
    const fewTypes = dataGrip.type.statistic.filter((statistic: any) => (
      statistic.tasks > 20
    )).length < 7;

    return [
      this.getBusFactor(dataGrip),
      (fewTypes ? getItem('fewTypes') : null),
      getItem('diff'),
      getItem('buddy'),
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

    return everyHasOne
      ? getItem('everyHasOne')
      : getArgDescription('oneMaintainer', [`- ${oneMaintainer.join(';\n- ')}`]);
  }
}
