import {type PropsWithChildren} from 'react';

import {Flex, Result, Spin} from '@new_york_style/project-template-ui';
import {useTranslation} from 'react-i18next';
import {Navigate, useLocation} from 'react-router-dom';

import {useAuth} from '@entities';
import {APP_ROUTES, Button} from '@shared';

import style from './route-guard-layout.module.scss';
import {isSessionUnresolved} from './session-unresolved';

export const ProtectedRoute = ({children}: PropsWithChildren) => {
  const {t} = useTranslation('Common');
  const location = useLocation();
  const {
    isSessionLoading,
    isUserLogged,
    refetchSession,
    sessionConfirmed,
    sessionError,
  } = useAuth();

  if (!isUserLogged) {
    return (
      <Navigate to={APP_ROUTES.AUTH.ROOT} state={{from: location}} replace />
    );
  }

  if (isSessionUnresolved(isSessionLoading, sessionConfirmed, sessionError)) {
    return (
      <Flex align='center' className={style.fullScreenCenter} justify='center'>
        <Spin size='large' />
      </Flex>
    );
  }

  if (sessionConfirmed) {
    return <>{children}</>;
  }

  if (sessionError) {
    return (
      <Flex align='center' className={style.fullScreenCenter} justify='center'>
        <Result
          status='error'
          title={t('Session.VerifyErrorTitle')}
          subTitle={t('Session.VerifyErrorSubTitle')}
          extra={
            <Button type='primary' onClick={() => void refetchSession()}>
              {t('Session.Retry')}
            </Button>
          }
        />
      </Flex>
    );
  }

  return (
    <Navigate to={APP_ROUTES.AUTH.ROOT} state={{from: location}} replace />
  );
};
