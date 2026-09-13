import localization from './Localization';

const REF_LANGUAGE = {
  ar: true,
  de: true,
  en: true,
  es: true,
  fr: true,
  he: true,
  hi: true,
  ja: true,
  ko: true,
  pt: true,
  ru: true,
  zh: true,
};

function getBrowserLanguage() {
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (let i = 0; i < languages.length; i++) {
    const code = (languages[i] || '').slice(0, 2).toLowerCase();
    if (REF_LANGUAGE[code]) return code;
  }
  return 'en';
}

export const BROWSER_LANGUAGE = getBrowserLanguage();

export default function initializationI18n(userLanguage?: string) {
  localization.language = userLanguage
    || localStorage.getItem('language')
    || BROWSER_LANGUAGE
    || 'en';
  localization.updateLangAttribute();
}
