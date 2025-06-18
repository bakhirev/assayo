import { observable, action, makeObservable } from 'mobx';

import { DataGripDay } from 'ts/helpers/DataGrip/components/month';

type IPosition = [number, number];

class DayInfoStore {
  info: DataGripDay | undefined = undefined;

  position: IPosition = [0, 0];

  constructor() {
    makeObservable(this, {
      info: observable,
      open: action,
      close: action,
    });
  }

  toggle(dayInfo: DataGripDay, position: IPosition) {
    if (this.info?.timestamp === dayInfo?.timestamp) {
      this.close();
    } else {
      this.open(dayInfo);
      this.position = position;
    }
  }

  open(dayInfo: DataGripDay) {
    this.info = dayInfo;
  }

  close() {
    this.info = undefined;
  }
}

const dayInfoStore = new DayInfoStore();

export default dayInfoStore;
