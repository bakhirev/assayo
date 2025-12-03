import { observable, action, makeObservable } from 'mobx';

import { HashMap } from 'ts/interfaces/HashMap';
import localization from 'ts/helpers/Localization';

class TranslationStore {
  refKeyTranslation: HashMap<string> = new Map();

  constructor() {
    makeObservable(this, {
      refKeyTranslation: observable,
      update: action,
    });
  }

  update(key: string, value: string) {
    this.refKeyTranslation.set(key, value);
    localization.updateTranslation(key, value);
  }

  print() {
    const text = Array.from(this.refKeyTranslation.entries())
      .map(([key, value]) => `§ ${key}: ${value}`)
      .join('\r\n');
    console.log(text);
  }
}

const translationStore = new TranslationStore();

// @ts-ignore
window.translationStore = translationStore;

export default translationStore;
