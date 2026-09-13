const REF_CODE_LOCALE = {
  ar: 'ar-SA',
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  he: 'he-IL',
  hi: 'hi-IN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pt: 'pt-PT',
  ru: 'ru-RU',
  zh: 'zh-CN',
};

export function getLangPrefix() {
  // @ts-ignore
  const code = window?.localization?.language || 'ru';
  return REF_CODE_LOCALE[code] || code || 'en-US';
}
