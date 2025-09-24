import {AppLayout} from './app-layout';
import i18nShellInstance from '../shared/utils/i18n-init';
import {ToastProvider, getAntdThemeConfig, paramsStore} from '@common';
import {ConfigProvider} from 'antd';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

export const App = observer(() => {
  const {init, theme} = paramsStore;

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <ConfigProvider theme={getAntdThemeConfig(theme)}>
          <ToastProvider>
            <AppLayout />
          </ToastProvider>
        </ConfigProvider>
      </I18nextProvider>
    </React.Suspense>
  );
});

export default App;
