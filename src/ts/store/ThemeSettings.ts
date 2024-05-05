import { makeObservable, observable, action } from 'mobx';

class ThemeSettings {
  urlParameters: any = {};

  constructor() {
    makeObservable(this, {
      urlParameters: observable,
      setUrlParameters: action,
    });
  }

  setUrlParameters(urlParameters: any) {
    this.urlParameters = urlParameters || {};
  }

  getLogo() {
    return {
      icon: './assets/logo.svg',
      link: '',
      title: '',
      isOpenInNewTab: false,
    };
  }
}

const themeSettings = new ThemeSettings();

export default themeSettings;
