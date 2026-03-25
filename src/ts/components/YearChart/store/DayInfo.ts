import { observable, action, makeObservable } from 'mobx';

import { StatisticsDay } from 'ts/helpers/StatisticsByCommits/components/month';

type IPosition = [number, number];

class DayInfoStore {
  info: StatisticsDay | undefined = undefined;

  position: IPosition = [0, 0];

  constructor() {
    makeObservable(this, {
      info: observable,
      open: action,
      close: action,
    });
  }

  toggle(dayInfo: StatisticsDay, position: IPosition) {
    if (this.info?.timestamp === dayInfo?.timestamp) {
      this.close();
    } else {
      this.open(dayInfo);
      this.position = position;
    }
  }

  open(dayInfo: StatisticsDay) {
    this.info = dayInfo;
  }

  close() {
    this.info = undefined;
  }
}

const dayInfoStore = new DayInfoStore();

export default dayInfoStore;
