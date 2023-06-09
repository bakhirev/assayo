import dataGrip from 'ts/helpers/DataGrip';

import ALL_ACHIEVEMENTS from './constants/list';
import byCompetition from './byCompetition';

export default function getAchievementByAuthor(author: string) {
  const statistic = dataGrip.author.statistic.find((item: any) => item.author === author);
  if (!statistic) return;

  const list = byCompetition.get(author);

  // Сова - 70% коммитов после 15:00
  if (statistic.hours.filter((hour: number) => hour >= 15).length > (statistic.commits * 0.7)) list.push('commitsAfter1500');
  // Раняя пташка - 70% коммитов до обеда
  if (statistic.hours.filter((hour: number) => hour <= 13).length > (statistic.commits * 0.7)) list.push('commitsBefore1500');
  // Делу время - ни одного коммита после 18:00
  if (statistic.hours.filter((hour: number) => hour > 18 || hour < 5).length === 0) list.push('commitsAfter1800');
  // Раб божий - есть коммит на каждый час суток
  if ((new Set(statistic.hours)).size === 24) list.push('workEveryTime');
  // Залётный - 1..5 коммитов за все время проекта
  if (statistic.commits <= 5) list.push('userNotWork');
  // Мёртвая душа - 6..60 коммитов за все время проекта
  if (statistic.commits >= 6 && statistic.commits <= 60) list.push('userIsDied');
  // Скорострел - меньше дня на задачу
  if (statistic.daysForTask < 1) list.push('lessDaysForTask');
  // Со слоу - больше двух дней на задачу (?)
  if (statistic.daysForTask > 2) list.push('more2DaysForTask');
  // Ни единого разрыва - 0 дней без коммитов
  if (statistic.lazyDays === 0) list.push('zeroLazyDays');
  // Стрельба холостыми - коммиты есть, а закрытых задач нет
  if (statistic.commits > 0 && statistic.tasks === 0) list.push('workNotWork');
  // сказал как отрезал - в среднем 1 коммит на таск
  if (statistic.tasks / statistic.commits) list.push('oneCommitOneTask');
  // Добро пожаловать - не уволили в течении трех месяцев с начала работы
  if (statistic.allDaysInProject > 90) list.push('more90DaysInProject');

  return list.reduce((acc: any, type: string) => {
    const index = ALL_ACHIEVEMENTS[type][2];
    acc[index].push(type);
    return acc;
  }, [[], [], []]);
}
