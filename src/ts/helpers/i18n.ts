import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from '../translations/ru';
import en from '../translations/en';

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

i18next.use(initReactI18next).init({
  lng: 'ru', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    ru: getTranslationWrapper(ru),
    en: getTranslationWrapper(en),
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});