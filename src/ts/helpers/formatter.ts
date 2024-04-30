import userSettings from 'ts/store/UserSettings';

export function getLangPrefix() {
  // @ts-ignore
  const code = window?.localization?.language || 'ru';
  return {
    ru: 'ru-RU',
    en: 'en-EN',
    zh: 'zh-ZH',
    es: 'es-ES',
    fr: 'fr-FR',
    pt: 'pt-PT',
    de: 'de-DE',
    ja: 'ja-JA',
  }[code] || 'ru-RU';
}

const ONE_DAY = 24 * 60 * 60 * 1000;
const TIMESTAMP = [
  ONE_DAY * 4,
  ONE_DAY * 5,
  ONE_DAY * 6,
  0,
  ONE_DAY,
  ONE_DAY * 2,
  ONE_DAY * 3,
];

export function getDayName(index:number, weekday: 'long' | 'short') {
  const date = new Date(TIMESTAMP[index]);
  return date.toLocaleString(getLangPrefix(), { weekday: weekday || 'long' });
}

export function getDateByTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const day = date.getDay() - 1;
  return [
    date.toLocaleString(getLangPrefix(), { day: 'numeric', month: 'long', year: 'numeric' }),
    getDayName(day < 0 ? 6 : day, 'long'),
  ];
}

export function get2Number(time: number) {
  return time < 10 ? `0${time}` : time;
}

export function getClearHTML(text: string) {
  return (text || '').trim().replace(/(>[\s\r\n]*<)/gim, '><');
}

export function getDate(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString(getLangPrefix(), { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getDateForExcel(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().substring(0, 10).split('-').reverse().join('.');
}

export function getShortDate(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString(getLangPrefix(), { day: 'numeric', month: 'long' });
}

export function getShortTime(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString(getLangPrefix(), { hour: 'numeric', minute: 'numeric' });
}

export function getMoney(value: number, options?: any) {
  return (value || 0).toLocaleString(getLangPrefix(), {
    style: 'currency',
    currency: userSettings?.settings?.defaultSalary?.currency || 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
    ...(options || {}),
  });
}

export function getShortMoney(value: number, maximumFractionDigits:number = 1) {
  return getMoney(value, {
    notation: 'compact',
    maximumFractionDigits,
  });
}

export function getShortNumber(value: number) {
  if (value === Infinity || value === -Infinity) return '—';
  const fractionDigits = value < 15 ? 1 : 0;
  return (value || 0).toFixed(fractionDigits);
}

export function getShortName(name: string) {
  return name?.split(/[\s.]+/gm)[1] || name;
}

export function getShortDateRange({ from, to }: any) {
  return from && to
    ? `${getShortDate(from)} — ${getDate(to)}`
    : `${getDate(from)}${getDate(to)}`;
}
