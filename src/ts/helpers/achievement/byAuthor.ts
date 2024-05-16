import ALL_ACHIEVEMENTS from './constants/list';

export default function getAchievementByAuthor(list: string[], statistic: any) {
  const commitByHours = statistic.commitsByHour;

  if (statistic.commits > 20) {
    // Сова - 70% коммитов после 15:00
    if (statistic.hours.filter((hour: number) => hour >= 15).length > (statistic.commits * 0.7)) list.push('commitsAfter1500');
    // Раняя пташка - 70% коммитов до обеда
    if (statistic.hours.filter((hour: number) => hour <= 13).length > (statistic.commits * 0.7)) list.push('commitsBefore1500');
  }

  if (statistic.isStaff) {
    // Залётный - это не его основной проект
    list.push('userNotWork');
  } else {
    // Ночной дозор
    if (commitByHours.slice(0, 7).every((commits: number) => commits)) list.push('hasCommitFrom0to7');
    // Технический перерыв
    if (commitByHours.slice(10, 18).some((commits: number) => !commits)) list.push('noCommitOnDay');
    // Делу время - ни одного коммита после 18:00
    if (commitByHours.slice(0, 5).every((commits: number) => !commits)
      && commitByHours.slice(18, 24).every((commits: number) => !commits)) list.push('commitsAfter1800');
    // Раб божий - есть коммит на каждый час суток
    if (commitByHours.every((commits: number) => commits)) list.push('workEveryTime');
    // Умер на работе
    if (statistic.commitsByDayAndHour.every((day: any) => day.every((v: any) => v))) list.push('hasCommitEveryTime');

    // Мёртвая душа - работал, но уволился
    if (statistic.isDismissed) list.push('userIsDied');
    // Скорострел - меньше дня на задачу
    if (statistic.daysForTask < 1) list.push('lessDaysForTask');
    // Со слоу - больше двух дней на задачу (?)
    if (statistic.daysForTask > 2) list.push('more2DaysForTask');
    // Добро пожаловать - не уволили в течении трех месяцев с начала работы
    if (statistic.allDaysInProject > 90) list.push('more90DaysInProject');
    // Годовасик - отработал 365 дней на проекте
    if (statistic.allDaysInProject >= 365) list.push('more365DaysInProject');
    // Чёрт - отработал 666 дней на проекте
    if (statistic.allDaysInProject >= 666) list.push('more666DaysInProject');
    // Азино - отработал 777 дней на проекте
    if (statistic.allDaysInProject >= 777) list.push('more777DaysInProject');
  }
  // Ни единого разрыва - 0 дней без коммитов
  if (statistic.lazyDays === 0) list.push('zeroLazyDays');
  // Стрельба холостыми - коммиты есть, а закрытых задач нет
  if (statistic.commits > 0 && statistic.tasks === 0) list.push('workNotWork');
  // Точно в цель - в среднем 1 коммит на таск
  if (statistic.tasks / statistic.commits) list.push('oneCommitOneTask');

  return list.reduce((acc: any, type: string) => {
    const index = ALL_ACHIEVEMENTS[type] - 1;
    acc[index].push(type);
    return acc;
  }, [[], [], []]);
}
