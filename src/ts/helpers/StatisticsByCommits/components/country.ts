import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { increment } from 'ts/helpers/Math';
import { getVpnList, getTravels } from 'ts/helpers/getCommitObjectsFromText/getCountryDistance';

export default class StatisticsByCountry {
  countries: HashMap<any> = new Map();

  vpn: IHashMap<any> = {};

  devices: IHashMap<any> = {};

  totalInfo: any = [];

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

  updateTotalInfo(statisticsByAuthor: any) {
    statisticsByAuthor.totalInfo.forEach((author: any) => {
      const vpnList = getVpnList(author.countries);
      author.countries = getTravels(author.countries, vpnList);
      this.#addAuthor(author.lastCountry || 'unknown', author.author);
      increment(this.devices, author.device || 'unknown');

      Array.from(vpnList.keys()).forEach((country: string) => {
        increment(this.vpn, country);
      });
    });

    this.totalInfo = Array.from(this.countries.values())
      .sort((a: any, b: any) => b?.employments?.length - a?.employments?.length);
    this.countries.clear();
  }
}
