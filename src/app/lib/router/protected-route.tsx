import {type PropsWithChildren} from 'react';

import {Navigate, useLocation} from 'react-router-dom';

import {useAuth} from '@entities';
import {APP_ROUTES} from '@shared';

export const ProtectedRoute = ({children}: PropsWithChildren) => {
  const location = useLocation();
  const {isUserLogged} = useAuth();

  if (!isUserLogged) {
    return (
      <Navigate to={APP_ROUTES.AUTH.ROOT} state={{from: location}} replace />
    );
  }

  return <>{children}</>;
};
