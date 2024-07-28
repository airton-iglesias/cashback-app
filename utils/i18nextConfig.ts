import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';

const getLanguage = () => {
  const locales = getLocales();
  return locales[0]?.languageCode ?? 'en';
};

const initializeI18Next = () => {
  i18n.use(initReactI18next).init({
    debug: false,
    lng: getLanguage(),
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      pt: {
        translation: pt,
      },
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    }
  });
};

export default initializeI18Next;
