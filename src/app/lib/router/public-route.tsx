import {type PropsWithChildren} from 'react';

import {observer} from 'mobx-react-lite';
import {Navigate, useLocation} from 'react-router-dom';

import {userStore} from '@entities';
import {APP_ROUTES} from '@shared';

export const PublicRoute = observer(({children}: PropsWithChildren) => {
  const {isUserLogged} = userStore;
  const location = useLocation();

  if (isUserLogged) {
    const from = location.state?.from?.pathname || APP_ROUTES.HOME.ROOT;

    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
});
