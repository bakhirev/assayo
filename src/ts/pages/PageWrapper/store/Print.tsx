import { makeObservable, observable, action } from 'mobx';

export interface IPrintStore {
  open: Function;
  close: Function;
}

class PrintStore implements IPrintStore {
  isOpen: boolean = false;

  navigate: any = null;

  prevUrl: string = '';

  constructor() {
    makeObservable(this, {
      isOpen: observable,

      open: action,
      close: action,
      printPage: action,
      printSection: action,
      printAllPages: action,
      triggerPrint: action,
      endPrint: action,
    });
  }

  open(navigate: Function, prevUrl: string) {
    this.isOpen = true;
    this.navigate = navigate;
    this.prevUrl = prevUrl;
  }

  close() {
    this.isOpen = false;
    this.navigate = null;
    this.prevUrl = '';
  }

  printPage() {
    this.triggerPrint();
  }

  printSection() {
    let newUrl: any = this.prevUrl.split('/');
    newUrl[2] = 'print';
    newUrl = newUrl.join('/');

    this.navigate(newUrl);
    this.triggerPrint();
  }

  printAllPages() {
    this.triggerPrint();
  }

  triggerPrint() {
    this.isOpen = false;
    setTimeout(() => {
      window.print();
    }, 500);
  }

  endPrint() {
    if (this.prevUrl) this.navigate(this.prevUrl);
    this.navigate = null;
    this.prevUrl = '';
  }
}

const printStore = new PrintStore();

export default printStore;
