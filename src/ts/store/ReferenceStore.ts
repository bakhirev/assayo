import { makeObservable, observable, action } from 'mobx';

import IBanner from 'ts/interfaces/Banner';

function getBannerByRef(ref?: string): IBanner {
  const parts = (ref || '').split('_');
  const type = parts.shift() || '';
  const name = parts.join('_') || '';

  return {
    isOpenInNewTab: Boolean(type && name),
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

class ReferenceStore {
  ref: string = '';

  constructor() {
    makeObservable(this, {
      ref: observable,
      setReference: action,
    });
  }

  setReference(ref?: string) {
    this.ref = ref || '';
  }

  getBanner(): IBanner {
    return getBannerByRef(this.ref);
  }
}

const referenceStore = new ReferenceStore();

export default referenceStore;
