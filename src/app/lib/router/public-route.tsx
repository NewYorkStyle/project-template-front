import {type PropsWithChildren} from 'react';

import {observer} from 'mobx-react-lite';
import {Navigate} from 'react-router-dom';

import {userStore} from '@entities';
import {APP_ROUTES} from '@shared';

export const PublicRoute = observer(({children}: PropsWithChildren) => {
  const {isUserLogged} = userStore;

  if (isUserLogged) {
    const from = APP_ROUTES.HOME.ROOT;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
});
