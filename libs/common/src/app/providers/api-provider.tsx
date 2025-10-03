import {userStore} from '../../entities';
import {setOnLogout} from '../../shared';
import {useEffect} from 'react';

export const ApiProvider = ({children}: {children: React.ReactNode}) => {
  useEffect(() => {
    setOnLogout(() => {
      userStore.loggout();
    });
  }, []);

  return <>{children}</>;
};
