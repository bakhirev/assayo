import { makeObservable, observable, action } from 'mobx';

const LOGO = {
  isDefault: true,
  icon: './assets/logo.svg',
  isOpenInNewTab: false,
};

const EXTERNAL_LOGO = {
  vk_frontend_du2: {
    icon: './social/vk/frontend_du2.png',
    banner: './social/vk/frontend_du2.jpg',
    link: 'https://vk.com/frontend_du2',
    title: 'Сообщество о веб-разработке и программировании',
  },
  vk_take_off_staff: {
    icon: './social/vk/take_off_staff.png',
    banner: './social/vk/take_off_staff.jpg',
    link: 'https://vk.com/takeoff_staff',
  },
  vk_awesomejs: {
    icon: './social/vk/awesomejs.png',
    banner: './social/vk/awesomejs.jpg',
    link: 'https://vk.com/awesomejs',
  },
  vk_frontend_dev: {
    icon: './social/vk/frontend_dev.png',
    banner: './social/vk/frontend_dev.jpg',
    link: 'https://vk.com/frontend_dev',
  },
  vk_front_work: {
    icon: './social/vk/front_work.png',
    banner: './social/vk/front_work.jpg',
    link: 'https://frontends.work/?ref=assayo',
  },
};

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
    let config = EXTERNAL_LOGO[this.urlParameters?.ref || ''];
    if (!config) return LOGO;

    config.isOpenInNewTab = true;
    return config;
  }

  getBanner() {
    let config = EXTERNAL_LOGO[this.urlParameters?.ref || ''];
    if (!config) return null;

    config.isOpenInNewTab = true;
    return config;
  }
}

const themeSettings = new ThemeSettings();

export default themeSettings;
