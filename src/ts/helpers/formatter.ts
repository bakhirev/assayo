import settingsStore from 'ts/store/Settings';

export function getDayName(index: number, value?: string) {
  const name = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
  ][index];
  if (value) {
    if (index == 2) return 'среду';
    else if (index == 4) return 'пятницу';
    else if (index == 5) return 'субботу';
  }
  return name;
}

export function getDayPrefix(index:number) {
  return [
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
    'вс',
  ][index];
}

export function getDateByTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const day = date.getDay() - 1;
  return [
    date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
    getDayName(day < 0 ? 6 : day),
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
  return date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function getDateForExcel(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().substring(0, 10).split('-').reverse().join('.');
}

export function getShortDate(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString('ru-RU', { day: 'numeric', month: 'long' });
}

export function getShortTime(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' });
}

export function getMoney(value: number, options?: any) {
  return (value || 0).toLocaleString('ru-RU', {
    style: 'currency',
    currency: settingsStore?.currency || 'USD',
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
