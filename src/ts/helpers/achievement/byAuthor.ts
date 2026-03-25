import { EmailType } from 'ts/interfaces/Commit';
import ALL_ACHIEVEMENTS from './constants/list';

function getHoroscope(timestamp: string) {
  const [month, dayInMonth] = timestamp
    .substring(5, 10)
    .split('-')
    .map((value) => parseInt(value, 10));

  const horoscopeRange = [
    { from: [22, 12], to: [20, 1] },
    { from: [20, 1], to: [18, 2] },
    { from: [19, 2], to: [20, 3] },
    { from: [21, 3], to: [19, 4] },
    { from: [20, 4], to: [20, 5] },
    { from: [21, 5], to: [21, 6] },
    { from: [22, 6], to: [22, 7] },
    { from: [23, 7], to: [22, 8] },
    { from: [23, 8], to: [22, 9] },
    { from: [23, 9], to: [23, 10] },
    { from: [24, 10], to: [22, 11] },
    { from: [23, 11], to: [21, 12] },
  ];

  const achievementIndex = horoscopeRange.reduce((acc: string, item: any, index: number) => {
    if (acc) return acc;
    if ((item.from[1] === month && dayInMonth >= item.from[0])
      || (item.to[1] === month && dayInMonth <= item.to[0])) return `${index + 1}`;
    return acc;
  }, '');

  return `horoscope${achievementIndex}`;
}


export default function getAchievementByAuthor(
  list: string[],
  statisticsByCommits: any,
  author: string,
) {
  const statistic = statisticsByCommits.author.totalInfoByName.get(author);
  const commitByHours = statistic.commitsByHour;

  if (statistic.commits > 20) {
    let totalCommitsAfter15 = 0;
    let totalCommitsBefore13 = 0;
    const totalCommitsLimit = statistic.commits * 0.7;
    commitByHours.forEach((commits: number, hour: number) => {
      if (hour >= 15) totalCommitsAfter15 += commits;
      if (hour <= 13) totalCommitsBefore13 += commits;
    });
    // Сова - 70% коммитов после 15:00
    if (totalCommitsAfter15 > totalCommitsLimit) list.push('commitsAfter1500');
    // Раняя пташка - 70% коммитов до обеда
    if (totalCommitsBefore13 > totalCommitsLimit) list.push('commitsBefore1500');
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
    if (statistic.totalTaskInDay < 1) list.push('lessDaysForTask');
    // Со слоу - больше двух дней на задачу (?)
    if (statistic.totalTaskInDay > 2) list.push('more2DaysForTask');
    // Добро пожаловать - не уволили в течении трех месяцев с начала работы
    if (statistic.totalDays > 90) list.push('more90DaysInProject');
    // Годовасик - отработал 365 дней на проекте
    if (statistic.totalDays >= 365) list.push('more365DaysInProject');
    // Чёрт - отработал 666 дней на проекте
    if (statistic.totalDays >= 666) list.push('more666DaysInProject');
    // Азино - отработал 777 дней на проекте
    if (statistic.totalDays >= 777) list.push('more777DaysInProject');
    // Старожил - отработал 3 года на проекте
    if (statistic.totalDays >= (3 * 365)) list.push('more3YearsInProject');
    // хоть раз работал на выходных
    if (statistic.totalWeekendsDaysWithCommits) list.push('workOnWeekends');

    // работал над задачей больше трех месяцев
    const daysInWork = statisticsByCommits.tasks.longTaskByAuthor[author] || {};
    if (daysInWork > 92) list.push('longTask');
  }
  // Ни единого разрыва - 0 дней без коммитов
  if (statistic.totalDaysWithoutCommits === 0) list.push('zeroLazyDays');
  // Стрельба холостыми - коммиты есть, а закрытых задач нет
  if (statistic.commits > 0 && statistic.totalTasks === 0) list.push('workNotWork');
  // Точно в цель - в среднем 1 коммит на таск
  if (statistic.totalTaskInCommits < 2) list.push('oneCommitOneTask');

  // Ванильный раф
  if (statistic.device) list.push('mackBook');

  if (statistic.emails) {
    // Почтальон Печкин. Не заполнил поле e-mail
    // if (!statistic.emails) list.push('haveNotEmail');
    statistic.emails.forEach((email: string) => {
      const emailInfo = statisticsByCommits.email.totalInfoByName.get(email);
      if (emailInfo?.type === EmailType.GITHUB) {
        // Домработница
        list.push('github');
      } else if (emailInfo?.type === EmailType.NETWORK) {
        // LAN-man
        list.push('ipInEmail');
      }
    });
  }

  list.push(getHoroscope(statistic.firstCommitTimestamp));

  const statisticByPr = statisticsByCommits.pr.totalInfoByName[author] || {};
  if (statisticByPr?.maxDelayDays > 31) list.push('longWaitPR');

  list = Array.from(new Set(list));

  return list.reduce((acc: any, type: string) => {
    const index = ALL_ACHIEVEMENTS[type] - 1;
    if (acc[index]) acc[index].push(type);
    else console.log(`Achievement ${type} not found.`);
    return acc;
  }, [[], [], [], []]);
}
