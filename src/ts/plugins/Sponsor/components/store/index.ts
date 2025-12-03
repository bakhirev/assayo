import { observable, action, makeObservable } from 'mobx';

import isMobile from 'ts/helpers/isMobile';
import themeSettings from 'ts/store/ThemeSettings';

export const MODAL_TYPE = {
  HIDE: 0,
  SHARE: 2,
};

class SponsorStore {
  type: number = MODAL_TYPE.HIDE;

  constructor() {
    makeObservable(this, {
      type: observable,
      close: action,
    });

    const isLocal = window.location.hostname === 'localhost';
    if (!isLocal && !isMobile && !themeSettings.getConfig()) {
      this.setTimer();
    }
  }

  setTimer() {
    const ONE_MINUTE = 60 * 1000;
    setInterval(() => {
      if (this.type) return;
      this.type = MODAL_TYPE.SHARE;
    }, 7 * ONE_MINUTE);
  }

  close() {
    this.type = MODAL_TYPE.HIDE;
  }
}

const sponsorStore = new SponsorStore();

export default sponsorStore;
