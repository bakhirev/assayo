import { getDateByTimestamp } from 'ts/helpers/formatter';

export default class RecommendationsPersonByTimestamp {
  getTotalInfo(dataGrip: any) {
    return dataGrip.author.list.reduce((acc: any, name: string) => {
      const byTimestamp = dataGrip.timestamp.statisticByAuthor[name];
      const byAuthor = dataGrip.author.statisticByName[name];
      const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
      acc[name] = [
        workInWeek ? [`${workInWeek} дней`, 'работы на выходных', 'error'] : null,
        byAuthor.daysLosses ? [`${byAuthor.daysLosses} дней`, 'без коммитов, даже с учётом выходных, отпуска и государственных праздников.', 'warning'] : null,
        [`${byAuthor.daysAll} дней`, 'от первого до последнего коммита (включая выходные и праздники)', 'fact'],
        this.getFirstDay(byTimestamp),
        this.getLastDay(byTimestamp),
      ].filter(item => item);
      return acc;
    }, {});
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return [date, `сделал первый коммит\n\nДень недели: ${day}`, 'fact'];
  }

  getLastDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return [date, `сделал последний коммит\n\nДень недели: ${day}`, 'fact'];
  }
}


