import { getBuilder } from '../helpers';

const { getItem, getArgDescription } = getBuilder('type');

export default class RecommendationsTeamByType {
  getTotalInfo(statisticsByCommits: any) {
    const fewTypes = statisticsByCommits.type.totalInfo.filter((statistic: any) => (
      statistic.tasks > 20
    )).length < 7;

    return [
      this.getBusFactor(statisticsByCommits),
      (fewTypes ? getItem('fewTypes') : null),
      getItem('diff'),
      getItem('buddy'),
    ].filter(item => item);
  }

  getBusFactor(statisticsByCommits: any) {
    if (statisticsByCommits.author.list.length < 2) return null;
    if (statisticsByCommits.type.totalInfo.length > 200) return null; // for performance

    // TODO: bad performance
    const oneMaintainer = statisticsByCommits.type.totalInfo.filter((statistic: any) => {
      const limit = statistic.commits * 0.8;
      return statisticsByCommits.author.list.some((name: string) => statistic.commitsByAuthors[name] >= limit);
    }).map((statistic: any) => statistic.type);

    if (!oneMaintainer.length) return null;
    const everyHasOne = oneMaintainer.length > statisticsByCommits.type.totalInfo.length * 0.6;

    return everyHasOne
      ? getItem('everyHasOne')
      : getArgDescription('oneMaintainer', [`- ${oneMaintainer.join(';\n- ')}`]);
  }
}
