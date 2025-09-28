import {AppProviders} from './app-providers';
import i18nShellInstance from '../shared/utils/i18n-init';
import {paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

export const App = observer(() => {
  const {init} = paramsStore;

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <AppProviders />
      </I18nextProvider>
    </React.Suspense>
  );
});

export default App;
