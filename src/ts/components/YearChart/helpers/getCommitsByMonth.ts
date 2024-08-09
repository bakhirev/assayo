import IHashMap from 'ts/interfaces/HashMap';
import { get2Number } from 'ts/helpers/formatter';
import userSettings from 'ts/store/UserSettings';

import IMonth from '../interfaces/Month';
import IWorkDay from '../interfaces/WorkDay';

function getDefaultMonthInfo(
  month:number,
  year: number,
  authorsByDate: IHashMap<any>,
): IMonth {
  return {
    id: `${month}-${year}`,
    month,
    year,
    first: false,
    last: false,
    date: new Date(`${year}-${get2Number(month + 1)}-01`),
    firstDay: authorsByDate.firstDay[`${month}-${year}`],
    lastDay: authorsByDate.lastDay[`${month}-${year}`],
    commits: [],
  };
}

function getAllMonths(firstDay: any, lastDay: any, authorsByDate: IHashMap<any>) {
  const months: IMonth[] = [];
  const monthsByDate: IHashMap<IMonth> = {};

  for (let year = firstDay.year; year <= lastDay.year; year++) {
    const firstMonth = year === firstDay.year ? firstDay.month : 0;
    const lastMonth = year === lastDay.year ? (lastDay.month + 1) : 12;
    for (let month = firstMonth; month < lastMonth; month++) {
      const data = getDefaultMonthInfo(month, year, authorsByDate);
      months.push(data);
      monthsByDate[data.id] = data;
    }
  }

  months.slice(firstDay?.month);
  months.slice(months.length - (12 - lastDay?.month));
  months[0].first = true;
  months[months.length - 1].last = true;
  months[months.length - 1].lastDay = undefined;

  return { months, monthsByDate };
}

function addCommitsInMonth(
  workDay: IWorkDay,
  monthsByDate: IHashMap<IMonth>,
  commits: IWorkDay[],
) {
  const key = `${workDay.month}-${workDay.year}`;
  if (monthsByDate[key]) {
    monthsByDate[key].commits = commits;

    const tasks: any = [];
    const authors: any = [];
    commits.forEach((commit: any) => {
      tasks.push(...Object.keys(commit.tasks));
      authors.push(...Object.keys(commit.tasksByAuthor));
    });
    monthsByDate[key].tasks = Array.from(new Set(tasks)).length;

    const uniqueAuthors = Array.from(new Set(authors));
    // @ts-ignore
    monthsByDate[key].money = uniqueAuthors.reduce((money: number, name: string) => {
      return money + userSettings.getCurrentSalaryInMonth(name); // TODO: need middle salary in month
    }, 0);
  }
}

export default function getCommitsByMonth(
  wordDays: any[],
  authorsByDate: IHashMap<any>,
) {
  let prev: any = { month: 0, year: 0 };
  let commits: any = [];

  const firstDay = wordDays[0];
  const lastDay = wordDays[wordDays.length - 1];
  const { months, monthsByDate } = getAllMonths(firstDay, lastDay, authorsByDate);

  wordDays.forEach((dayInfo: IWorkDay) => {
    if (dayInfo.month !== prev.month || dayInfo.year !== prev.year) {
      addCommitsInMonth(prev, monthsByDate, commits);
      commits = [dayInfo];
    } else {
      commits.push(dayInfo);
    }
    prev = dayInfo;
  });

  addCommitsInMonth(prev, monthsByDate, commits);

  return months;
}
