import { makeObservable, observable, action } from 'mobx';

import { t } from 'ts/helpers/Localization';

export interface IConfirmStore {
  title: string;
  yes: string;
  no: string;
  open: Function;
  close: Function;
}

class ConfirmStore implements IConfirmStore {
  title: string = '';

  yes: string = '';

  no: string = '';

  isOpen: boolean = false;

  successCallback: Function = () => {};

  cancelCallback: Function = () => {};

  constructor() {
    makeObservable(this, {
      title: observable,
      yes: observable,
      no: observable,
      successCallback: observable,
      cancelCallback: observable,
      isOpen: observable,

      open: action,
      close: action,
    });
  }

  open(options?: any) {
    this.title = options?.title || options || t('common.confirm.title');
    this.yes = options?.yes || t('common.confirm.yes');
    this.no = options?.no || t('common.confirm.no');
    this.isOpen = true;
    return new Promise((response: any, reject: any) => {
      this.successCallback = response;
      this.cancelCallback = reject;
    });
  }

  close() {
    this.isOpen = false;
  }

  success() {
    if (!this.isOpen) return;
    this.close();
    this.successCallback();
  }

  cancel() {
    if (!this.isOpen) return;
    this.close();
    this.cancelCallback();
  }
}

const confirm = new ConfirmStore();

export default confirm;
