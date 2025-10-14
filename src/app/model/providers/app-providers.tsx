import {useEffect, useMemo} from 'react';

import {App, ConfigProvider} from 'antd';
import en_US from 'antd/locale/en_US';
import ru_RU from 'antd/locale/ru_RU';
import {observer} from 'mobx-react-lite';
import {I18nextProvider} from 'react-i18next';

import {paramsStore} from '@entities';
import {
  getAntdThemeConfig,
  NotificationProvider,
  ModalProvider,
  i18nInstance,
} from '@shared';

import {Router} from '../../lib';

import {ApiProvider} from './api-provider';
import {AuthProvider} from './auth-provider';

export const AppProviders = observer(() => {
  const {init, language, theme} = paramsStore;

  const antLocale = useMemo(() => {
    let antdLocale = en_US;

    switch (language) {
      case 'ru':
        antdLocale = ru_RU;
        break;
      case 'en':
      default:
        antdLocale = en_US;
        break;
    }

    return antdLocale;
  }, [language]);

  useEffect(() => {
    init();
  }, []);

  return (
    <App>
      <I18nextProvider i18n={i18nInstance}>
        <ApiProvider>
          <ConfigProvider theme={getAntdThemeConfig(theme)} locale={antLocale}>
            <ModalProvider />
            <NotificationProvider />
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ConfigProvider>
        </ApiProvider>
      </I18nextProvider>
    </App>
  );
});
