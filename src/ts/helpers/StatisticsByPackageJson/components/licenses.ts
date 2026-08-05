import { HashMap } from 'ts/interfaces/HashMap';
import { SourceDataPackage } from 'ts/interfaces/SourceData';

export interface License {
  title: string;
  packages: string[];
  total: number;
}

export default class StatisticsByLicenses {
  data: HashMap<License> = new Map();

  totalInfo: License[] = [];

  constructor() {
    this.clear();
  }

  clear() {
    this.data.clear();
    this.totalInfo = [];
  }

  addData(data: SourceDataPackage) {
    const key = data.license || 'unknown';
    const statistic = this.data.get(key);
    if (statistic) {
      this.#updateData(statistic, data);
    } else {
      this.#addNewData(key, data);
    }
  }

  #updateData(statistic: License, data: SourceDataPackage) {
    statistic.packages.push(data.name);
    statistic.total += 1;
  }

  #addNewData(key: string, data: SourceDataPackage) {
    this.data.set(key, {
      title: key,
      packages: [data.name],
      total: 1,
    });
  }

  updateTotalInfo() {
    this.totalInfo = Array.from(this.data.values())
      .sort((a: any, b: any) => b.total - a.total);
    this.data = new Map();
  }
}
