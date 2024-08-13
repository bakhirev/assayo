import { observable, action, makeObservable } from 'mobx';

export enum ViewNameEnum {
  EMPTY = 'empty',
  WELCOME = 'welcome',
  INFO = 'info',
}

class ViewNameStore {
  view: ViewNameEnum = ViewNameEnum.EMPTY;

  constructor() {
    makeObservable(this, {
      view: observable,
      toggle: action,
    });
  }

  toggle(view: ViewNameEnum) {
    this.view = view;
  }
}

const viewNameStore = new ViewNameStore();

export default viewNameStore;
