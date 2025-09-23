import {AppLayout} from './app-layout';
import i18nShellInstance from '../shared/utils/i18n-init';
import {ToastProvider, paramsStore} from '@common';
import {ConfigProvider} from 'antd';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

export const App = () => {
  const {getParams} = paramsStore;

  useEffect(() => {
    getParams();
  }, []);

  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <ConfigProvider>
          <ToastProvider>
            <AppLayout />
          </ToastProvider>
        </ConfigProvider>
      </I18nextProvider>
    </React.Suspense>
  );
};

export default App;
