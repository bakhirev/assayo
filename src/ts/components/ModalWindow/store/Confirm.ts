import { makeObservable, observable, action } from 'mobx';

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
    this.title = options?.title || options || 'Вы уверены что хотите удалить?';
    this.yes = options?.yes || 'Да, уверен';
    this.no = options?.no || 'Отмена';
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
