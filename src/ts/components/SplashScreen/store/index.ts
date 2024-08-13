import { observable, action, makeObservable } from 'mobx';
import globalScroll from 'ts/helpers/globalScroll';

class SplashScreenStore {
  isOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      show: action,
      hide: action,
    });
  }

  show() {
    this.isOpen = true;
    globalScroll.off(5400);
  }

  hide() {
    this.isOpen = false;
  }
}

const splashScreen = new SplashScreenStore();

export default splashScreen;
