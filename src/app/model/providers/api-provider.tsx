import {type ReactNode, useEffect} from 'react';

import {userStore} from '@entities';
import {setOnLogout} from '@shared';

export const ApiProvider = ({children}: {children: ReactNode}) => {
  useEffect(() => {
    setOnLogout(() => {
      userStore.loggout();
    });
  }, []);

  return <>{children}</>;
};
