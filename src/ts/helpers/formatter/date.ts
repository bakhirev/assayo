import { getLangPrefix } from './languages';

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

export function getDateByTimestamp(timestamp: string) {
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

export function getDateForExcel(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().substring(0, 10).split('-').reverse().join('.');
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
