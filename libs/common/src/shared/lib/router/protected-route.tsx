import {userStore} from '../../../features';
import {observer} from 'mobx-react-lite';
import React, {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

type TProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<TProtectedRouteProps> = observer(
  ({children, redirectTo = '/auth'}) => {
    const {isUserLogged} = userStore;
    const location = useLocation();

    if (!isUserLogged) {
      return <Navigate to={redirectTo} state={{from: location}} replace />;
    }

    return <>{children}</>;
  }
);
