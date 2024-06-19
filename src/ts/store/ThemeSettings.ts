import { makeObservable, observable, action } from 'mobx';

import IHashMap from 'ts/interfaces/HashMap';
import IBanner from 'ts/interfaces/Banner';

const LOGO: IBanner = {
  logo: './assets/logo.svg',
  isOpenInNewTab: false,
};

const EXTERNAL_LOGO: IHashMap<IBanner> = {
  vk_frontend_du2: {
    logo: './social/vk/frontend_du2.png',
    banner: './social/vk/frontend_du2.jpg',
    link: 'https://vk.com/frontend_du2',
  },
  vk_take_off_staff: {
    logo: './social/vk/take_off_staff.png',
    banner: './social/vk/take_off_staff.jpg',
    link: 'https://vk.com/takeoff_staff',
  },
};

function getDefaultBanner(ref: string): IBanner | null {
  if (!ref) return null;

  const parts = ref.split('_');
  const type = parts.shift() || '';
  const name = parts.join('_');
  if (!name) return null;

  return {
    isOpenInNewTab: true,
    logo: './assets/logo.svg',
    link: {
      vk: `https://vk.com/${name}`,
      yt: `https://www.youtube.com/@${name}`,
      tg: `https://t.me/@${name}`,
    }[type],
    text: name,
    textIcon: {
      vk: './social/vk.png',
      yt: './social/youtube.png',
      tg: './social/tg.png',
    }[type],
    color: '#FFFFFF',
    backgroundColor: {
      vk: '#5181B8',
      yt: '#FE0000',
      tg: '#29A6E6',
    }[type] || '#EFC526',
  };
}

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

  getConfig(): IBanner {
    const ref = this.urlParameters?.ref || '';
    return EXTERNAL_LOGO[ref] || getDefaultBanner(ref);
  }

  getLogo(): IBanner | null {
    return LOGO || this.getConfig() || LOGO;
  }

  getBanner(): IBanner | null {
    return this.getConfig();
  }
}

const themeSettings = new ThemeSettings();

export default themeSettings;
