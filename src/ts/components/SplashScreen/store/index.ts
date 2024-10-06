import { observable, action, makeObservable } from 'mobx';
import globalScroll from 'ts/helpers/globalScroll';

const DEFAULT_DELAY = 3400;

class SplashScreenStore {
  isOpen: boolean = false;

  delay: number = DEFAULT_DELAY;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      delay: observable,
      show: action,
      hide: action,
      setDelay: action,
    });
  }

  show() {
    this.isOpen = true;
    globalScroll.off(this.delay);
  }

  hide() {
    this.isOpen = false;
  }

  setDelay(logSize: number) {
    const delay = (logSize / 190) + 400;
    this.delay = Math.max(DEFAULT_DELAY, delay);
  }

  getDelay(diff?: number) {
    const delay = this.delay + (diff || 0);
    return (delay / 1000).toFixed(1) + 's';
  }
}

const splashScreen = new SplashScreenStore();

export default splashScreen;
