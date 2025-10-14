import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import AppHeaderEn from './locales/en/AppHeader.json';
import AuthEn from './locales/en/Auth.json';
import MainEn from './locales/en/Main.json';
import UserEn from './locales/en/User.json';
import AppHeaderRu from './locales/ru/AppHeader.json';
import AuthRu from './locales/ru/Auth.json';
import MainRu from './locales/ru/Main.json';
import UserRu from './locales/ru/User.json';

const resources = {
  en: {
    AppHeader: AppHeaderEn,
    Auth: AuthEn,
    Main: MainEn,
    User: UserEn,
  },
  ru: {
    AppHeader: AppHeaderRu,
    Auth: AuthRu,
    Main: MainRu,
    User: UserRu,
  },
};

export const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    interpolation: {escapeValue: false},
    lng: localStorage.getItem('language') ?? 'ru',
    react: {useSuspense: true},
    resources,
  });
