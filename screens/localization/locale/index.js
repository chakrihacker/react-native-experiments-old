import i18n from 'i18n-js';
import {memoize} from 'lodash';
import * as RNLocalize from 'react-native-localize';
// import {I18nManager} from 'react-native';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;

const translationGetters = {
  en: () => require('./en.json'),
  ar: () => require('./ar.json'),
};

const rtlGetters = {
  en: false,
  ar: true,
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = updatedLanguage => {
  translate.cache.clear();
  // I18nManager.forceRTL(rtlGetters[languageTag]);
  if (!updatedLanguage) {
    const fallback = {languageTag: 'en', isRTL: false};

    const {languageTag, isRTL} =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
    i18n.isRTL = isRTL;
    i18n.translations = {
      [languageTag]: translationGetters[languageTag](),
    };
    i18n.locale = languageTag;
  } else {
    i18n.isRTL = rtlGetters[updatedLanguage];
    i18n.translations = {
      [updatedLanguage]: translationGetters[updatedLanguage](),
    };
    i18n.locale = updatedLanguage;
  }
};
