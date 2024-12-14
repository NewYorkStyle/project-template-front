import style from './app.module.less';
import i18nShellInstance from '../shared/utils/i18n-init';
import {Header} from '../widgets/header/header';
import * as React from 'react';
import {I18nextProvider} from 'react-i18next';
import {Navigate, Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));

export const App = () => {
  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <div className={style.root}>
          <Header />
          <Routes>
            <Route path='*' element={<Navigate to='/main' />} />
            <Route path='/main' element={<Main />} />
          </Routes>
        </div>
      </I18nextProvider>
    </React.Suspense>
  );
};

export default App;
