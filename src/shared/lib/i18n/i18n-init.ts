import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

import AppHeaderEn from './locales/en/AppHeader.json' with {type: 'json'};
import AuthEn from './locales/en/Auth.json' with {type: 'json'};
import CommonEn from './locales/en/Common.json' with {type: 'json'};
import MainEn from './locales/en/Main.json' with {type: 'json'};
import TourEn from './locales/en/Tour.json' with {type: 'json'};
import UserEn from './locales/en/User.json' with {type: 'json'};
import AppHeaderRu from './locales/ru/AppHeader.json' with {type: 'json'};
import AuthRu from './locales/ru/Auth.json' with {type: 'json'};
import CommonRu from './locales/ru/Common.json' with {type: 'json'};
import MainRu from './locales/ru/Main.json' with {type: 'json'};
import TourRu from './locales/ru/Tour.json' with {type: 'json'};
import UserRu from './locales/ru/User.json' with {type: 'json'};

const resources = {
  en: {
    AppHeader: AppHeaderEn,
    Auth: AuthEn,
    Common: CommonEn,
    Main: MainEn,
    Tour: TourEn,
    User: UserEn,
  },
  ru: {
    AppHeader: AppHeaderRu,
    Auth: AuthRu,
    Common: CommonRu,
    Main: MainRu,
    Tour: TourRu,
    User: UserRu,
  },
};

export const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    defaultNS: 'Common',
    fallbackLng: 'ru',
    interpolation: {escapeValue: false},
    lng: localStorage.getItem('language') ?? 'ru',
    ns: ['Common', 'AppHeader', 'Auth', 'Main', 'Tour', 'User'],
    react: {useSuspense: true},
    resources,
  });
