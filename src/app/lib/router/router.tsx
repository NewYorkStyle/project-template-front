import {Navigate, Route, Routes} from 'react-router-dom';

import {Home, Profile} from '@pages';
import {APP_ROUTES} from '@shared';

import {AppLayout} from '../../ui';

export const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route id='root' path={APP_ROUTES.HOME.ROOT}>
          <Route index element={<Home />} />
        </Route>
        <Route id='user' path={APP_ROUTES.USER.ROOT}>
          <Route index element={<Profile />} />
        </Route>
        <Route
          path='*'
          element={<Navigate to={APP_ROUTES.HOME.ROOT} replace />}
        />
      </Route>
    </Routes>
  );
};
