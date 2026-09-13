import IHashMap, { HashMap } from 'ts/interfaces/HashMap';

class Localization {
  language:string = 'ru';

  translations: HashMap<HashMap<string>> = new Map();

  get(key: string | undefined = '', args?: IHashMap<any>) {
    const translations = this.translations.get(this.language);
    const message = translations?.get(key || '');
    return message
      ? this.insertArguments(message, args)
      : key || '';
  }

  insertArguments(message: string, args?: IHashMap<any>) {
    if (!args) return message;
    Object.entries(args).forEach(([name, value]: [string, any]) => {
      message = message.split(`{${name}}`).join(`${value ?? '_'}`);
    });
    return message;
  }

  #updateTranslationByText(translations: any, text: string) {
    text.split('§ ').slice(1).forEach((part: string) => {
      const body = part.trimEnd();
      let index = body.indexOf('\n');
      if (index === -1) index = body.indexOf(':');
      if (index === -1) return;
      translations.set(body.slice(0, index), body.slice(index + 1).trim());
    });
  }

  addTranslationsForLanguage(langId: string, text: string) {
    const translations = this.translations.get(langId) || new Map();
    this.#updateTranslationByText(translations, text);
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
