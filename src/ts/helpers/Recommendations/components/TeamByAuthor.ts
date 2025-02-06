import { getBuilder } from '../helpers';

const {
  getItem,
  getTitle,
  getArgTitleDescription,
} = getBuilder('author');

export default class RecommendationsTeamByAuthor {
  getTotalInfo(dataGrip: any) {
    const worker: string[] = [];
    const dismissed: string[] = [];
    const staff: string[] = [];
    const lotOfLazy: string[] = [];
    const manyLazy: string[] = [];
    const oneTypeMans: string[] = [];
    let workLazyTotal = 1;

    dataGrip.author.list.forEach((name: string) => {
      const author = dataGrip.author.statisticByName[name];
      if (author.isStaff) {
        staff.push(name);
        return;
      }

      if (author.isDismissed) {
        dismissed.push(name);
        return;
      }

      worker.push(name);

      const workLazy = author.daysWorked / author.daysLosses;
      if (workLazy >= 0 && workLazy < 3) lotOfLazy.unshift(name);
      if (workLazy >= 3 && workLazy < 5) manyLazy.unshift(name);
      workLazyTotal = workLazyTotal * workLazy;

      // TODO: Что это за число? Я не помню
      const someNumber = Object.values(author.types).sort().pop() as number;
      const typePercent = (someNumber * 100) / author.commits;
      if (typePercent >= 70) oneTypeMans.unshift(name);
    });

    workLazyTotal = workLazyTotal ** (1 / worker.length);
    const projectType = this.getProjectType(workLazyTotal);

    return [
      projectType,

      (lotOfLazy.length ? getArgTitleDescription('lotOfLazy', lotOfLazy.length, lotOfLazy.join(';\n- ')) : null),
      (manyLazy.length ? getArgTitleDescription('manyLazy', manyLazy.length, manyLazy.join(';\n- ')) : null),
      (oneTypeMans.length ? getTitle('oneTypeMans', oneTypeMans) : null),
      (worker.length ? getArgTitleDescription('workToday', worker.length, worker.join(';\n- ')) : null),
      (dismissed.length ? getArgTitleDescription('dismissed', dismissed.length, dismissed.join(';\n- ')) : null),
      (staff.length ? getArgTitleDescription('staff', staff.length, staff.join(';\n- ')) : null),

      // ['Планирование', 'Задачи распределены довольно равномерно', 'info'],
      getItem('manager'),
      getItem('shorTalk'),
      getItem('ipr'),
      getItem('oneToOne'),
      getItem('club'),
    ].filter(item => item);
  }

  getProjectType(workLazyTotal: number) {
    if (workLazyTotal < 1) return getItem('projectTypeOpenSource');

    if (workLazyTotal < 5) return getItem('projectTypeEasy');

    return null;
  }
}
