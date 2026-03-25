import applicationConfig from 'ts/store/ApplicationConfig';

import { getLangPrefix } from './languages';

let EXCHANGE_RATE = {};
export function updateExchangeRate(value: Record<string, number>) {
  EXCHANGE_RATE = value ?? {};
}

function getCurrencyFromUSD(money: number, currency: string) {
  if (currency === 'USD' || !money) return money;
  const k = EXCHANGE_RATE[currency] || 1;
  return k * money;
}

export function getMoney(value: number, options?: any) {
  const currency = applicationConfig?.config?.currency || 'USD';
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
