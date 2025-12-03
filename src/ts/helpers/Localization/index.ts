import { HashMap } from 'ts/interfaces/HashMap';

class Localization {
  language:string = 'ru';

  translations: HashMap<HashMap<string>> = new Map();

  get(key: string | undefined = '', ...args: any) {
    const translations = this.translations.get(this.language);
    const message = translations?.get(key || '');
    return message
      ? this.insertArguments(message, args)
      : key || '';
  }

  insertArguments(message: string, args?: any) {
    if (!args) return message;
    const list = Array.isArray(args) ? args : [args];
    list.forEach((text: any, index: number) => {
      message = message.replace(`$${index + 1}`, text || '_');
    });
    return message;
  }

  parse(langId: string, text: string) {
    const translations = new Map();
    text.split('§ ').slice(1).forEach((part: string) => {
      let index = part.indexOf('\n');
      if (index === (part.length - 1)) {
        index = part.indexOf(':');
      }
      const key = part.slice(0, index);
      const value = part.slice(index + 1).trim();
      translations.set(key, value);
    });
    this.translations.set(langId, translations);
  }

  updateLangAttribute() {
    try {
      // @ts-ignore
      document.body.parentNode.setAttribute('lang', this.language);
    } catch (e) {}
  }

  updateTranslation(key: string, value: string) {
    const translations = this.translations.get(this.language);
    translations?.set?.(key, value);
  }
}

const localization = new Localization();
// @ts-ignore
window.localization = localization;

export default localization;

export function t(code: string): string {
  return localization.get(code);
}
