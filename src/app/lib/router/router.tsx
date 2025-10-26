import {Navigate, Route, Routes} from 'react-router-dom';

import {Auth, Home, NotFound, Profile} from '@pages';
import {APP_ROUTES} from '@shared';

import {AppLayout, AuthLayout} from '../../ui';

import {ProtectedRoute} from './protected-route';
import {PublicRoute} from './public-route';

export const Router = () => {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.AUTH.ROOT}
        element={
          <PublicRoute>
            <AuthLayout>
              <Auth />
            </AuthLayout>
          </PublicRoute>
        }
      />

      <Route
        path={APP_ROUTES.ROOT}
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={APP_ROUTES.HOME.ROOT} replace />} />
        <Route path={APP_ROUTES.HOME.ROOT} element={<Home />} />
        <Route path={APP_ROUTES.USER.ROOT} element={<Profile />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
