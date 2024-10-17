import { HashMap } from 'ts/interfaces/HashMap';
import { ONE_DAY } from 'ts/helpers/formatter';

const BY_X = {
  '-12:00': 1,
  '-11:00': 2,
  '-10:00': 3,
  '-09:30': 3.5,
  '-09:00': 4,
  '-08:00': 5,
  '-07:00': 6,
  '-06:00': 7,
  '-05:00': 8,
  '-04:00': 9,
  '-03:00': 10,
  '-02:00': 11,
  '-01:00': 12,
  '+00:00': 13,
  '+01:00': 14,
  '+02:00': 15,
  '+03:00': 16,
  '+03:30': 16.5,
  '+04:00': 17,
  '+04:30': 17.5,
  '+05:00': 18,
  '+05:30': 18.5,
  '+05:45': 18.75,
  '+06:00': 19,
  '+07:00': 20,
  '+08:00': 21,
  '+09:00': 22,
  '+09:30': 22.5,
  '+10:00': 23,
  '+10:30': 23.5,
  '+11:00': 24,
  '+12:00': 25,
  '+13:00': 26,
};

function getDistance(timezoneA: string, timezoneB: string) {
  return Math.abs(BY_X[timezoneA] - BY_X[timezoneB]);
}

export function getVpnList(countries: any[]) {
  const vpn = new Map();

  if (countries.length < 2) return vpn;

  for (let i = 0, l = countries.length; i < l; i++) {
    const from = countries[i];
    const to = countries[i + 1];
    const next = countries[i + 2];
    if (!to || !next) continue;
    const isFast = (next?.from - from?.from) < ONE_DAY;
    const isThisPlace = from.timezone === next.timezone;
    if (isFast && isThisPlace) {
      vpn.set(to.country, to.timezone);
      i += 1;
    }
  }

  return vpn;
}

export function getTravels(countries: any[], vpnList: HashMap<string>) {
  if (countries.length === 1) return null;

  let from = countries[0].timezone;
  const path = [countries[0]];

  const formattedCountries = countries.length > 3
    ? countries.filter((item: any) => !vpnList.has(item.country))
    : countries;

  for (let i = 1, l = formattedCountries.length; i < l; i++) {
    const country = formattedCountries[i];
    const to = country.timezone;
    if (from === to) continue;
    if (getDistance(from, to) > 1) {
      from = to;
      path.push(country);
    }
  }

  return (path.length === 1) ? null : path;
}

