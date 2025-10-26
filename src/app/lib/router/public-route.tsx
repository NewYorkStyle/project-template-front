import {type PropsWithChildren} from 'react';

import {Navigate, useLocation} from 'react-router-dom';

import {useAuth} from '@entities';
import {APP_ROUTES} from '@shared';

export const PublicRoute = ({children}: PropsWithChildren) => {
  const {isUserLogged} = useAuth();
  const location = useLocation();

  if (isUserLogged) {
    const from = location.state?.from?.pathname || APP_ROUTES.HOME.ROOT;

    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
