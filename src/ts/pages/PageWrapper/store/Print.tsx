import { makeObservable, observable, action } from 'mobx';

export interface IPrintStore {
  open: Function;
  close: Function;
}

class PrintStore implements IPrintStore {
  isOpen: boolean = false;

  navigate: any = null;

  prevUrl: string = '';

  processing: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      processing: observable,

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
    this.navigate('/print');
    this.triggerPrint();
  }

  triggerPrint() {
    this.isOpen = false;
    this.processing = true;
    setTimeout(() => {
      window.print();
    }, 500);
  }

  endPrint() {
    this.processing = false;
    if (this.prevUrl) this.navigate(this.prevUrl);
    this.navigate = null;
    this.prevUrl = '';
  }
}

const printStore = new PrintStore();

export default printStore;
