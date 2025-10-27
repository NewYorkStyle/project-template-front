import {useMemo} from 'react';

import {App, ConfigProvider} from 'antd';
import en_US from 'antd/locale/en_US';
import ru_RU from 'antd/locale/ru_RU';
import {I18nextProvider} from 'react-i18next';

import {useLanguage, useMetrics, useParams, useTheme} from '@entities';
import {
  getAntdThemeConfig,
  NotificationProvider,
  ModalProvider,
  i18nInstance,
  ErrorBoundary,
} from '@shared';

import {Router} from '../../lib';

export const AppInitializer = () => {
  const {data: params} = useParams();
  const {theme} = useTheme();
  const {language} = useLanguage();

  useMetrics(params);

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

  return (
    <ConfigProvider theme={getAntdThemeConfig(theme)} locale={antLocale}>
      <I18nextProvider i18n={i18nInstance}>
        <ErrorBoundary>
          <App>
            <ModalProvider />
            <NotificationProvider />
            <Router />
          </App>
        </ErrorBoundary>
      </I18nextProvider>
    </ConfigProvider>
  );
};
