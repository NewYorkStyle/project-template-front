import enJSON from '../../entities/locales/en/translation.json';
import ruJSON from '../../entities/locales/ru/translation.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {translation: enJSON},
  ru: {translation: ruJSON},
};

const i18nMainInstance = i18n.createInstance();

i18nMainInstance.use(initReactI18next).init({
  fallbackLng: 'ru',
  interpolation: {escapeValue: false},
  lng: localStorage.getItem('language') ?? 'ru',
  react: {useSuspense: true},
  resources,
});

export default i18nMainInstance;
