import {AppLayout} from './app-layout';
import {
  ModalProvider,
  NotificationProvider,
  getAntdThemeConfig,
  paramsStore,
} from '@common';
import {App, ConfigProvider} from 'antd';
import en_US from 'antd/locale/en_US';
import ru_RU from 'antd/locale/ru_RU';
import {observer} from 'mobx-react-lite';
import {useMemo} from 'react';

export const AppProviders = observer(() => {
  const {language, theme} = paramsStore;

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
    <App>
      <ConfigProvider theme={getAntdThemeConfig(theme)} locale={antLocale}>
        <ModalProvider />
        <NotificationProvider>
          <AppLayout />
        </NotificationProvider>
      </ConfigProvider>
    </App>
  );
});
