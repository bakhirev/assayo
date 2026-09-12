import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { increment } from 'ts/helpers/Math';
import { getVpnList, getTravels } from 'ts/helpers/getCommitObjectsFromText/getCountryDistance';

import StatisticsByAuthor, { StatisticsAuthor } from './author';

export interface StatisticsCountry {
  country: string;
  employments: string[];
}

export default class StatisticsByCountry {
  countries: HashMap<StatisticsCountry> = new Map();

  vpn: IHashMap<number> = {};

  devices: IHashMap<number> = {};

  totalInfo: StatisticsCountry[] = [];

  clear() {
    this.countries.clear();
    this.vpn = {};
    this.devices = {};
    this.totalInfo = [];
  }

  #addAuthor(country: string, author: string) {
    const statistic = this.countries.get(country);
    if (statistic) {
      statistic.employments.push(author);
    } else {
      this.countries.set(country, {
        country,
        employments: [author],
      });
    }
  }

  updateTotalInfo(statisticsByAuthor: StatisticsByAuthor) {
    statisticsByAuthor.totalInfo.forEach((author: StatisticsAuthor) => {
      const vpnList = getVpnList(author.countries || []);
      author.countries = getTravels(author.countries || [], vpnList);
      this.#addAuthor(author.lastCountry || 'unknown', author.author);
      increment(this.devices, author.device || 'unknown');

      Array.from(vpnList.keys()).forEach((country: string) => {
        increment(this.vpn, country);
      });
    });

    this.totalInfo = Array.from(this.countries.values())
      .sort((a: StatisticsCountry, b: StatisticsCountry) => b.employments.length - a.employments.length);
    this.countries.clear();
  }
}
