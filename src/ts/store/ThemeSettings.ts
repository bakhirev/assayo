import { makeObservable, observable, action } from 'mobx';

import IBanner from 'ts/interfaces/Banner';
import IHashMap from 'ts/interfaces/HashMap';

const LOGO: IBanner = {
  isDefault: true,
  icon: './assets/logo.svg',
  isOpenInNewTab: false,
};

const EXTERNAL_LOGO: IHashMap<IBanner> = {
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
    // banner: './social/vk/awesomejs.jpg',
    link: 'https://vk.com/awesomejs',
    bannerText: 'Сбер Банк',
    color: '#000',
    backgroundColor: '#C2ECC1',
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

  getLogo(): IBanner {
    const ref = this.urlParameters?.ref || '';
    let config = EXTERNAL_LOGO[ref];
    if (!config) return LOGO;

    config.ref = ref;
    config.isOpenInNewTab = true;

    return config;
  }

  getBanner(): IBanner | null {
    let config = EXTERNAL_LOGO[this.urlParameters?.ref || ''];
    if (!config) return null;

    config.isOpenInNewTab = true;
    return config;
  }
}

const themeSettings = new ThemeSettings();

export default themeSettings;
