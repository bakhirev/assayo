import RECOMMENDATION_TYPES from '../contstants';

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

      (lotOfLazy.length ? {
        title: lotOfLazy,
        description: 'recommendations.author.lotOfLazy',
        type: RECOMMENDATION_TYPES.ALERT,
      } : null),

      (manyLazy.length ? {
        title: manyLazy,
        description: 'recommendations.author.manyLazy',
        type: RECOMMENDATION_TYPES.WARNING,
      } : null),

      (oneTypeMans.length ? {
        title: oneTypeMans,
        description: 'recommendations.author.oneTypeMans',
        type: RECOMMENDATION_TYPES.WARNING,
      } : null),

      (worker.length ? {
        title: 'recommendations.author.workToday.title',
        description: 'recommendations.author.workToday.description',
        type: RECOMMENDATION_TYPES.FACT,
        arguments: {
          title: worker.length,
          description: worker.join(';\n- '),
        },
      } : null),

      (dismissed.length ? {
        title: 'recommendations.author.dismissed.title',
        description: 'recommendations.author.dismissed.description',
        type: RECOMMENDATION_TYPES.FACT,
        arguments: {
          title: dismissed.length,
          description: dismissed.join(';\n- '),
        },
      } : null),

      (staff.length ? {
        title: 'recommendations.author.staff.title',
        description: 'recommendations.author.staff.description',
        type: RECOMMENDATION_TYPES.FACT,
        arguments: {
          title: staff.length,
          description: staff.join(';\n- '),
        },
      } : null),

      // ['Планирование', 'Задачи распределены довольно равномерно', 'info'],
      {
        title: 'recommendations.author.manager.title',
        description: 'recommendations.author.manager.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.author.shorTalk.title',
        description: 'recommendations.author.shorTalk.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.author.ipr.title',
        description: 'recommendations.author.ipr.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.author.oneToOne.title',
        description: 'recommendations.author.oneToOne.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
      {
        title: 'recommendations.author.club.title',
        description: 'recommendations.author.club.description',
        type: RECOMMENDATION_TYPES.INFO,
      },
    ].filter(item => item);
  }

  getProjectType(workLazyTotal: number) {
    if (workLazyTotal < 1) return {
      title: 'recommendations.author.projectType.openSource.title',
      description: 'recommendations.author.projectType.openSource.description',
      type: RECOMMENDATION_TYPES.FACT,
    };

    if (workLazyTotal < 5) return {
      title: 'recommendations.author.projectType.easy.title',
      description: 'recommendations.author.projectType.easy.description',
      type: RECOMMENDATION_TYPES.ALERT,
    };

    return null;
  }
}


