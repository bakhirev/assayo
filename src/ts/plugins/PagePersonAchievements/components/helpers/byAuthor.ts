import { EmailType } from 'ts/interfaces/Commit';
import ALL_ACHIEVEMENTS from './constants/list';

type PrStats = {
  numberMergedPr: number;
  maxDelayDays: number;
};

const EMPTY_GROUPS: string[][] = [[], [], [], []];

const HOROSCOPE_START_DAY = [21, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];

export function getHoroscope(timestamp?: string) {
  if (!timestamp || timestamp.length < 10) return '';
  const month = Number(timestamp.slice(5, 7));
  const day = Number(timestamp.slice(8, 10));
  if (!month || !day) return '';
  const index = day >= HOROSCOPE_START_DAY[month - 1]
    ? (month % 12) + 1
    : month;
  return `horoscope${index}`;
}

function groupByType(codes: string[]) {
  return [...new Set(codes.filter(Boolean))].reduce((groups: string[][], code) => {
    const index = ALL_ACHIEVEMENTS[code] - 1;
    if (groups[index]) groups[index].push(code);
    return groups;
  }, [[], [], [], []]);
}

function getOwlAndLark(hours: number[], commits: number) {
  if (commits <= 20) return [];
  const limit = commits * 0.7;
  const [after15, before13] = hours.reduce((acc, count, hour) => {
    if (hour >= 15) acc[0] += count;
    if (hour <= 13) acc[1] += count;
    return acc;
  }, [0, 0]);
  return [
    after15 > limit ? 'commitsAfter1500' : '',
    before13 > limit ? 'commitsBefore1500' : '',
  ];
}

function getEmployeeAchievements(statistic: any, hours: number[], longestTaskDays: number) {
  const daysPerTask = statistic.totalTasks > 0
    ? 1 / statistic.totalTaskInDay
    : Infinity;
  const totalDays = statistic.totalDays || 0;
  
  return [
    hours.slice(0, 7).every(Boolean) ? 'hasCommitFrom0to7' : '',
    hours.slice(10, 18).some((count) => !count) ? 'noCommitOnDay' : '',
    hours.slice(0, 5).every((count) => !count) && hours.slice(18, 24).every((count) => !count) ? 'commitsAfter1800' : '',
    hours.every(Boolean) ? 'workEveryTime' : '',

    statistic.commitsByDayAndHour.every((day) => day.every(Boolean)) ? 'hasCommitEveryTime' : '',
    statistic.isDismissed ? 'userIsDied' : '',

    daysPerTask < 1 ? 'lessDaysForTask' : '',
    daysPerTask > 2 ? 'more2DaysForTask' : '',

    totalDays > 90 ? 'more90DaysInProject' : '',
    totalDays >= 365 ? 'more365DaysInProject' : '',
    totalDays >= 666 ? 'more666DaysInProject' : '',
    totalDays >= 777 ? 'more777DaysInProject' : '',
    totalDays >= 3 * 365 ? 'more3YearsInProject' : '',

    statistic.totalWeekendsDaysWithCommits ? 'workOnWeekends' : '',
    longestTaskDays > 92 ? 'longTask' : '',
  ];
}

function getEmailAchievements(emails: string[] = [], emailStats?: Map<string, any>) {
  if (!emails.length || !emailStats) return [];
  return emails.map((email) => {
    const type = emailStats.get(email)?.type;
    if (type === EmailType.GITHUB) return 'github';
    if (type === EmailType.NETWORK) return 'ipInEmail';
    return '';
  });
}

function getCommonAchievements(
  statistic: any,
  statisticsByCommits: any,
  prStats?: PrStats,
) {
  return [
    statistic.totalDaysWithoutCommits === 0 ? 'zeroLazyDays' : '',
    statistic.commits > 0 && statistic.totalTasks === 0 ? 'workNotWork' : '',
    statistic.totalTasks > 0 && statistic.totalTaskInCommits < 2 ? 'oneCommitOneTask' : '',
    statistic.device ? 'mackBook' : '',
    ...getEmailAchievements(statistic.emails, statisticsByCommits.email?.totalInfoByName),
    getHoroscope(statistic.firstCommitTimestamp),
    (prStats?.maxDelayDays || 0) > 31 ? 'longWaitPR' : '',
  ];
}

export default function getAchievementByAuthor(
  codes: string[],
  statistic: any,
  statisticsByCommits: any,
  prStats?: PrStats,
  longestTaskDays = 0,
) {
  if (!statistic) return EMPTY_GROUPS.map((group) => [...group]);
  const hours = statistic.commitsByHour || [];

  return groupByType([
    ...codes,
    ...getOwlAndLark(hours, statistic.commits || 0),
    ...(statistic.isStaff ? ['userNotWork'] : getEmployeeAchievements(statistic, hours, longestTaskDays)),
    ...getCommonAchievements(statistic, statisticsByCommits, prStats),
  ]);
}
