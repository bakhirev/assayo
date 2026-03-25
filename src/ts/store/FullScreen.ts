import { observable, action, makeObservable } from 'mobx';

class FullScreenStore {
  mode: string = '';

  isOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      on: action,
      off: action,
      toggle: action,
    });
  }

  on(mode?: string) {
    this.isOpen = true;
    this.mode = mode || '';
  }

  off() {
    this.isOpen = false;
    this.mode = '';
  }

  toggle(mode?: string) {
    if (this.isOpen) {
      this.off();
    } else {
      this.on(mode);
    }
  }
}

const fullScreen = new FullScreenStore();

export default fullScreen;
