import { SourceDataPackage } from 'ts/interfaces/SourceData';

import StatisticsByLicenses from './components/licenses';
import { StatisticsByPackages } from './components/packages';

class StatisticsByPackageJson {
  licenses: any = new StatisticsByLicenses();

  packages: any = new StatisticsByPackages();

  clear() {
    this.licenses.clear();
  }

  update(data: SourceDataPackage[]) {
    (data || []).forEach((item) => {
      if (item.name) this.addData(item);
    });
  }

  addData(data: SourceDataPackage) {
    this.licenses.addData(data);
    this.packages.addData(data);
  }

  updateTotalInfo() {
    this.licenses.updateTotalInfo();
    this.packages.updateTotalInfo();
  }
}

const statisticsByPackageJson = new StatisticsByPackageJson();

export default statisticsByPackageJson;
