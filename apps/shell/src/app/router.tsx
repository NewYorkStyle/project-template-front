import {AuthRoute, ProtectedRoute} from '@common';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));
const Authentication = React.lazy(() => import('authentication/Module'));

export const Router = () => {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path='/auth'
        element={
          <AuthRoute>
            <Authentication />
          </AuthRoute>
        }
      />
      <Route
        path='/main'
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
