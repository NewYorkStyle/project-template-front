import {type PropsWithChildren} from 'react';

import {observer} from 'mobx-react-lite';
import {Navigate, useLocation} from 'react-router-dom';

import {userStore} from '@entities';
import {APP_ROUTES} from '@shared';

export const ProtectedRoute = observer(({children}: PropsWithChildren) => {
  const location = useLocation();
  const {isUserLogged} = userStore;

  if (!isUserLogged) {
    return (
      <Navigate to={APP_ROUTES.AUTH.ROOT} state={{from: location}} replace />
    );
  }

  return <>{children}</>;
});
