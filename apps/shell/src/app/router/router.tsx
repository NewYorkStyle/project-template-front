import {AuthRoute, ProtectedRoute, ROUTES} from '@common';
import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));
const Authentication = React.lazy(() => import('authentication/Module'));
const User = React.lazy(() => import('user/Module'));

export const Router = () => {
  return (
    <Routes>
      <Route
        path={`${ROUTES.AUTH.ROOT}/*`}
        element={
          <AuthRoute>
            <Authentication />
          </AuthRoute>
        }
      />
      <Route
        path={`${ROUTES.MAIN.ROOT}/*`}
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${ROUTES.USER.ROOT}/*`}
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <ProtectedRoute>
            <Navigate to={ROUTES.MAIN.ROOT} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
