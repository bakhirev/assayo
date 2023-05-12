import localization  from 'ts/helpers/Localization';

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
      (lotOfLazy.length ? [lotOfLazy, localization.get('recommendations.author.lotOfLazy'), 'error'] : null),
      (manyLazy.length ? [manyLazy, localization.get('recommendations.author.manyLazy'), 'warning'] : null),
      (oneTypeMans.length ? [oneTypeMans, localization.get('recommendations.author.oneTypeMans'), 'warning'] : null),
      (worker.length
        ? [`Работает ${worker.length}`, `над проектом в данный момент.

# Состав: 
- ${worker.join(';\n- ')};

# Почему именно они:
- рабочих дней более 50%;
- работали в течении последних 30 дней;
`, 'fact'] : null),
      (dismissed.length
        ? [`Уволилось ${dismissed.length}`, `или работало короткий промежуток времени.

# Состав:
- ${dismissed.join(';\n- ')};

# Почему именно они:
- работали в нормальном ритме (видимо, это их основной репозиторий);
- за последний месяц не было ни одного коммита;
- отпуск обычно 14 дней (их отсутствие не похоже на отпуск);
`, 'fact'] : null),
      (staff.length
        ? [`Помогают ${staff.length}`, `Люди другой специализации, которые что-либо коммитили.

# Состав: 
- ${staff.join(';\n- ')};

# Почему именно они:
- это не open-source проект;
- рабочих дней менее 15% от общего числа;
- изменяют примерно одни и те же файлы;
`, 'fact']
        : null),
      // ['Планирование', 'Задачи распределены довольно равномерно', 'info'],
    ].filter(item => item);
  }

  getProjectType(workLazyTotal: number) {
    if (workLazyTotal < 1) return [
      localization.get('recommendations.author.projectType.openSource.title'),
      localization.get('recommendations.author.projectType.openSource.description'),
      'fact',
    ];
    if (workLazyTotal < 5) return [
      localization.get('recommendations.author.projectType.easy.title'),
      localization.get('recommendations.author.projectType.easy.description'),
      'error',
    ];
    return null;
  }
}


