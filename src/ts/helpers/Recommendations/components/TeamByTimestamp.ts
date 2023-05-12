import { getDateLength, getDateByTimestamp } from 'ts/helpers/formatter';

export default class RecommendationsTeamByTimestamp {
  getTotalInfo(dataGrip: any) {
    if (dataGrip.author.list.length < 2) return [];

    const byTimestamp = dataGrip.timestamp.statistic;
    const workInWeek = byTimestamp.workByDay[5] + byTimestamp.workByDay[6];
    const totalDays = byTimestamp.allCommitsByTimestamp.length;
    const totalFormattedDays = getDateLength(byTimestamp.allCommitsByTimestamp.length);
    // TODO: all days не верный, я вывожу рабочие дни, а не выходные.

    return [
      workInWeek ? [`${workInWeek} дней`, `работы на выходных

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- сотрудники быстрее выгорают;
`, 'error'] : null,
      this.getWorkOnWeek(byTimestamp.allCommitsByTimestamp.length, workInWeek),
      [totalFormattedDays, `(или ${totalDays} дней) от первого до последнего коммита (включая выходные и праздники)`, 'fact'],
      this.getFirstDay(byTimestamp),
      this.getLastDay(byTimestamp),
    ].filter(item => item);
  }

  getWorkOnWeek(allWorkDays: number, workOnWeek: number) {
    const percent = (workOnWeek * 100) / allWorkDays;
    const description = `Вероятно, стоит сменить менеджера проекта, аналитика и архитектора.

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- качество продуката, как правило, получается низкое;
- часть сотрудников увольняется;
- из-за спешки появляются новые ошибки;

# Скорее всего:
- неверно оценили сроки в самом начале;
- тех. задание отсутствует;
- слабая аналитика;
- слабая архитектура (архитектора не нанимали, а команда состоит из мидл разработчиков);
- сначала начали писать код, потом проектировать;
- нет нормальных процессов, чтобы понять ошибки;
`;
    if (percent > 13) {
      return ['Регулярные переработки', description, 'error'];
    }
    if (percent > 7) {
      return ['Бывают переработки', description, 'error'];
    }
    if (percent > 2) {
      return ['Обычно без переработок', `Но иногда бывают.

# Почему это плохо:
- заказчик платит двойную цену за работу в выходной день;
- сотрудники быстрее выгорают;
`, 'fact'];
    }
    return null;
  }

  getFirstDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[0];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return [date, `был первый коммит\n\nДень недели: ${day}`, 'fact'];
  }

  getLastDay(byTimestamp: any) {
    const commit = byTimestamp.allCommitsByTimestamp[(byTimestamp.allCommitsByTimestamp.length - 1)];
    const [ date, day ] = getDateByTimestamp(commit.timestamp);
    return [date, `был последний коммит\n\nДень недели: ${day}`, 'fact'];
  }
}


