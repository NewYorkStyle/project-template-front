import {userStore} from '../../entities/user/model/user-store';
import {setOnLogout} from '../../shared/api/base/api';
import {useEffect} from 'react';

export const ApiProvider = ({children}: {children: React.ReactNode}) => {
  useEffect(() => {
    setOnLogout(() => {
      userStore.loggout();
    });
  }, []);

  return <>{children}</>;
};
