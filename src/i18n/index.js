import { createI18n } from 'vue-i18n';
import en from './messages/en.json';
import numberFormats from './numberFormats';
import datetimeFormats from './datetimeFormats.js';
import { nextTick } from 'vue';

const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'hr'];

const extractLanguage = (locale) => {
  return locale.split('-')[0];
};

export function getDefaultLocale() {
  const persistedLocale = localStorage.getItem('locale');

  if (persistedLocale) {
    return persistedLocale;
  }

  const navigatorLocale = navigator.language;

  if (SUPPORTED_LOCALES.includes(navigatorLocale)) {
    return navigatorLocale;
  }

  const navigatorLang = extractLanguage(navigatorLocale);
  if (navigatorLocale.split('-').length > 1) {
    if (SUPPORTED_LOCALES.includes(navigatorLang)) {
      return navigatorLang;
    }
  }

  const fallback = SUPPORTED_LOCALES.find(
    (locale) => extractLanguage(locale) === navigatorLang
  );

  return fallback ? fallback : DEFAULT_LOCALE;
}

export async function loadLocaleMessages(i18n, locale) {
  if (!i18n.availableLocales.includes(locale)) {
    const messages = await import(`@/i18n/messages/${locale}.json`);
    i18n.setLocaleMessage(locale, messages);
  }
  return nextTick();
}

export default createI18n({
  locale: DEFAULT_LOCALE,
  legacy: false,
  fallbackLocale: 'en',
  messages: { en },
  numberFormats,
  datetimeFormats
});
