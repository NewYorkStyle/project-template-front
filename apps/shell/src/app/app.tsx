import style from './app.module.less';
import i18nShellInstance from '../shared/utils/i18n-init';
import {Header} from '../widgets/header/header';
import {paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {Navigate, Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));
const Authentication = React.lazy(() => import('authentication/Module'));

export const App = observer(() => {
  const {getParams} = paramsStore;

  useEffect(() => {
    getParams();
  }, []);

  return (
    <React.Suspense fallback={null}>
      <I18nextProvider i18n={i18nShellInstance}>
        <div className={style.root}>
          <Header />
          <div className={style.content}>
            <Routes>
              <Route path='*' element={<Navigate to='/main' />} />
              <Route path='/' element={<Authentication />} />
              <Route path='/main' element={<Main />} />
            </Routes>
          </div>
        </div>
      </I18nextProvider>
    </React.Suspense>
  );
});

export default App;
