import userSettings from 'ts/store/UserSettings';

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ONE_WEEK = 7 * ONE_DAY;

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


function getCurrencyFromUSD(money: number, currency: string) {
  if (currency === 'USD' || !money) return money;
  const k = {
    USD: 1,
    EUR: 0.92,
    RUB: 90,
    CNY: 7.26,
    JPY: 158,
    KRW: 1360,
    CAD: 1.4,
  }[currency] || 1;
  return k * money;
}

export function getMoney(value: number, options?: any) {
  const currency = userSettings?.settings?.defaultSalary?.currency || 'USD';
  return getCurrencyFromUSD(value || 0, currency)
    .toLocaleString(getLangPrefix(), {
      style: 'currency',
      currency,
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

export function getShortDateRange({ from, to }: any) {
  return from && to
    ? `${getShortDate(from)} — ${getDate(to)}`
    : `${getDate(from)}${getDate(to)}`;
}
