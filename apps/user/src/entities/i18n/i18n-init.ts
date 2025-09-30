import enJSON from '../locales/en/translation.json';
import ruJSON from '../locales/ru/translation.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {translation: enJSON},
  ru: {translation: ruJSON},
};

export const i18nUserInstance = i18n.createInstance();

i18nUserInstance.use(initReactI18next).init({
  fallbackLng: 'ru',
  interpolation: {escapeValue: false},
  lng: localStorage.getItem('language') ?? 'ru',
  react: {useSuspense: true},
  resources,
});
