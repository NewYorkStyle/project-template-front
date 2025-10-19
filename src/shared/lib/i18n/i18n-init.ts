import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import AppHeaderEn from './locales/en/AppHeader.json' assert {type: 'json'};
import AuthEn from './locales/en/Auth.json' assert {type: 'json'};
import MainEn from './locales/en/Main.json' assert {type: 'json'};
import UserEn from './locales/en/User.json' assert {type: 'json'};
import AppHeaderRu from './locales/ru/AppHeader.json' assert {type: 'json'};
import AuthRu from './locales/ru/Auth.json' assert {type: 'json'};
import MainRu from './locales/ru/Main.json' assert {type: 'json'};
import UserRu from './locales/ru/User.json' assert {type: 'json'};

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
