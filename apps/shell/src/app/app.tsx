import {Content} from './content';
import i18nShellInstance from '../shared/utils/i18n-init';
import {ToastProvider, paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

export const App = observer(() => {
  const {getParams} = paramsStore;

  useEffect(() => {
    getParams();
  }, []);

  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <ToastProvider>
          <Content />
        </ToastProvider>
      </I18nextProvider>
    </React.Suspense>
  );
});

export default App;
