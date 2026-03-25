import { observable, action, makeObservable } from 'mobx';

import { HashMap } from 'ts/interfaces/HashMap';
import localization from 'ts/helpers/Localization';

class TranslationStore {
  language: string = '';

  isOpen: boolean = false;

  isEditor: boolean = false;

  refKeyTranslation: HashMap<string> = new Map();

  constructor() {
    makeObservable(this, {
      language: observable,
      isOpen: observable,
      isEditor: observable,
      refKeyTranslation: observable,
      show: action,
      hide: action,
      editorOn: action,
      editorOff: action,
      update: action,
    });
  }

  show() {
    this.isOpen = true;
  }

  hide() {
    this.isOpen = false;
  }

  editorOn() {
    this.isEditor = true;
  }

  editorOff() {
    this.isEditor = false;
  }

  update(key: string, value: string) {
    this.refKeyTranslation.set(key, value);
    localization.updateTranslation(key, value);
  }

  getList() {
    return Array.from(this.refKeyTranslation.entries())
      .map(([key, value]) => ({ key, value }));
  }

  export(): string {
    return this.getList()
      .map(({ key, value }) => `§ ${key}: ${value}`)
      .join('\r\n');
  }

  setLanguage(language: string) {
    this.language = language;
  }
}

const translationStore = new TranslationStore();

// @ts-ignore
window.translationStore = translationStore;

export default translationStore;
