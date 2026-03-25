import de from '../translations/de';
import en from '../translations/en';
import es from '../translations/es';
import fr from '../translations/fr';
import ja from '../translations/ja';
import pt from '../translations/pt';
import ru from '../translations/ru';
import zh from '../translations/zh';
import ko from '../translations/ko';
import localization from './Localization';

function getJsonFromString(text: string) {
  return text
    .split('§ ')
    .slice(1)
    .reduce((translations, part: string) => {
      let index = part.indexOf('\n');
      if (index === (part.length - 1)) {
        index = part.indexOf(':');
      }

      const key = part.slice(0, index);
      translations[key] = part.slice(index + 1).trim();

      return translations;
    }, {});
}

function getTranslationWrapper(translation: string) {
  return {
    translation: getJsonFromString(translation),
  };
}

const translations = {
  de: getTranslationWrapper(de),
  en: getTranslationWrapper(en),
  es: getTranslationWrapper(es),
  fr: getTranslationWrapper(fr),
  ja: getTranslationWrapper(ja),
  pt: getTranslationWrapper(pt),
  ru: getTranslationWrapper(ru),
  zh: getTranslationWrapper(zh),
  ko: getTranslationWrapper(ko),
};

export const BROWSER_LANGUAGE = navigator.languages
  .filter((language) => language.length === 2 && translations[language])
  .shift() || 'en';

export default function initializationI18n(userLanguage?: string) {
  localization.language = userLanguage
    || localStorage.getItem('language')
    || BROWSER_LANGUAGE
    || 'en';
  localization.updateLangAttribute();
}

