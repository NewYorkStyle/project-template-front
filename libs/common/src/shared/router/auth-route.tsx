import {userStore} from '../../entities';
import {observer} from 'mobx-react-lite';
import React, {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

type TAuthRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export const AuthRoute: React.FC<TAuthRouteProps> = observer(
  ({children, redirectTo = '/main'}) => {
    const {isUserLogged} = userStore;
    const location = useLocation();

    if (isUserLogged) {
      return <Navigate to={redirectTo} state={{from: location}} replace />;
    }

    return <>{children}</>;
  }
);
