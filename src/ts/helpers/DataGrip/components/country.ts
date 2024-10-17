import IHashMap, { HashMap } from 'ts/interfaces/HashMap';
import { increment } from 'ts/helpers/Math';
import { getVpnList, getTravels } from 'ts/helpers/Parser/getCountryDistance';

export default class DataGripByCountry {
  countries: HashMap<any> = new Map();

  vpn: IHashMap<any> = {};

  devices: IHashMap<any> = {};

  statistic: any = [];

  clear() {
    this.countries.clear();
    this.vpn = {};
    this.devices = {};
    this.statistic = [];
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

  updateTotalInfo(dataGripByAuthor: any) {
    dataGripByAuthor.statistic.forEach((author: any) => {
      const vpnList = getVpnList(author.country);
      author.country = getTravels(author.country, vpnList);
      this.#addAuthor(author.lastCountry || 'unknown', author.author);
      increment(this.devices, author.device || 'unknown');

      Array.from(vpnList.keys()).forEach((country: string) => {
        increment(this.vpn, country);
      });
    });

    this.statistic = Array.from(this.countries.values())
      .sort((a: any, b: any) => b?.employments?.length - a?.employments?.length);
    this.countries.clear();
  }
}
