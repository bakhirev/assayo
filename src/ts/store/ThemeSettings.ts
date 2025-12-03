import { makeObservable, observable, action } from 'mobx';

import IBanner from 'ts/interfaces/Banner';

function getDefaultConfig(ref?: string): IBanner {
  const parts = (ref || '').split('_');
  const type = parts.shift() || '';
  const name = parts.join('_') || '';

  return {
    isOpenInNewTab: !!ref,
    logo: './assets/logo.svg',
    link: {
      vk: `https://vk.com/${name}`,
      yt: `https://www.youtube.com/@${name}`,
      tg: `https://t.me/${name}`,
      tw: `https://x.com/${name}`,
      www: `https://${name}/`,
    }[type],
    text: name,
    textIcon: {
      vk: './social/vk.png',
      yt: './social/youtube.png',
      tg: './social/tg.png',
      tw: './social/tw.png',
    }[type],
    color: '#FFFFFF',
    backgroundColor: {
      vk: '#5181B8',
      yt: '#FE0000',
      tg: '#29A6E6',
      tw: '#000000',
    }[type] || '#7F9BE0',
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
    return getDefaultConfig(ref);
  }
}

const themeSettings = new ThemeSettings();

export default themeSettings;
