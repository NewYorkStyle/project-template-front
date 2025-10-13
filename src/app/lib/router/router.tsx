import {Route, Routes} from 'react-router-dom';

import {Main, Profile} from '@pages';
import {APP_ROUTES} from '@shared';

import {AppLayout} from '../../ui';

export const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route id='root' path={APP_ROUTES.ROOT}>
          <Route index element={<Main />} />
        </Route>
        <Route id='user' path={APP_ROUTES.USER.ROOT}>
          <Route index element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};
