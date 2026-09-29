import { getLangPrefix } from './languages';
import { get2Number } from './number';

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ONE_WEEK = 7 * ONE_DAY;

const TIMESTAMP = [
  ONE_DAY * 4,
  ONE_DAY * 5,
  ONE_DAY * 6,
  0,
  ONE_DAY,
  ONE_DAY * 2,
  ONE_DAY * 3,
];

// for performance
const dayNameCache = new Map();
export function getDayName(index:number, weekday: 'long' | 'short') { // @ts-ignore
  const code = window?.localization?.language || 'ru';
  const response = dayNameCache.get(`${code}${index}${weekday}`);
  if (response) return response;

  const date = new Date(TIMESTAMP[index]);
  const dayName = date.toLocaleString(getLangPrefix(), { weekday: weekday || 'long' });
  dayNameCache.set(`${code}${index}${weekday}`, dayName);
  return dayName;
}

export function getDateByTimestamp(timestamp: string | number) {
  const date = new Date(timestamp);
  const day = date.getDay() - 1;
  return [
    date.toLocaleString(getLangPrefix(), { day: 'numeric', month: 'long', year: 'numeric' }),
    getDayName(day < 0 ? 6 : day, 'long'),
  ];
}

export function getCustomDate(timestamp: string | number, options?: any) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString(getLangPrefix(), options || { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getDate(timestamp: string | number) {
  return getCustomDate(timestamp, { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getShortDate(timestamp: string | number) {
  return getCustomDate(timestamp, { day: 'numeric', month: 'long' });
}

export function getShortTime(timestamp: string | number) {
  return getCustomDate(timestamp, { hour: 'numeric', minute: 'numeric' });
}

export function getFullTime(timestamp: string | number) {
  return getCustomDate(timestamp, { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
}

export function getDateForExcel(timestamp: string | number) {
  if (!timestamp && timestamp !== 0) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  return `${get2Number(date.getDate())}.${get2Number(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function getShortDateRange({ from, to }: any) {
  return from && to
    ? `${getShortDate(from)} — ${getDate(to)}`
    : `${getDate(from)}${getDate(to)}`;
}


function getRTF() {
  const rtf = new Intl.RelativeTimeFormat(getLangPrefix(), {
    numeric: 'always',
    style: 'long',
  });
  return (value: number, type: 'year' | 'month' | 'day') => (
    rtf.format(value, type).split(' ').slice(1).join(' ')
  );
}

export function getDuration(days: number) {
  const years = Math.floor(days / 365);
  const months = Math.floor(days / 30);
  const remainMonths = months - years * 12;
  const remainDays = days - months * 30;

  const rtf = getRTF();
  const durations = [];
  if (years) {
    durations.push(rtf(years, 'year'));
  }
  if (remainMonths) {
    durations.push(rtf(remainMonths, 'month'));
  }
  if (remainDays && years < 1) {
    durations.push(rtf(remainDays, 'day'));
  }

  return durations.join(' ');
}

// "2022-W21" -> ""
export function getHumanReadableWeek(isoWeekString: string) { // @ts-ignore
  const match = isoWeekString.match(/^(\d{4})-W(\d{2})$/);
  if (!match) return isoWeekString;

  const year = parseInt(match[1], 10);
  const week = parseInt(match[2], 10);

  const fourthOfJan = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = fourthOfJan.getUTCDay() || 7;
  const firstThursdayOffset = 4 - dayOfWeek;
  const firstMondayTime = fourthOfJan.getTime() + (firstThursdayOffset - 3) * 86400000;
  const from = firstMondayTime + (week - 1) * 7 * 86400000;
  const to = from + 6 * 86400000 + 86399;

  return getShortDateRange({ from, to });
}
