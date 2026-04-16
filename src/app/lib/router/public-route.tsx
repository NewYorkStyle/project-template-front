import {type PropsWithChildren} from 'react';

import {Flex, Result, Spin} from '@new_york_style/project-template-ui';
import {useTranslation} from 'react-i18next';
import {Navigate, useLocation} from 'react-router-dom';

import {useAuth} from '@entities';
import {APP_ROUTES, Button} from '@shared';

import style from './route-guard-layout.module.scss';
import {isSessionUnresolved} from './session-unresolved';

export const PublicRoute = ({children}: PropsWithChildren) => {
  const {t} = useTranslation('Common');
  const {
    isSessionLoading,
    isUserLogged,
    refetchSession,
    sessionConfirmed,
    sessionError,
  } = useAuth();
  const location = useLocation();

  if (!isUserLogged) {
    return <>{children}</>;
  }

  if (isSessionUnresolved(isSessionLoading, sessionConfirmed, sessionError)) {
    return (
      <Flex align='center' className={style.fullScreenCenter} justify='center'>
        <Spin size='large' />
      </Flex>
    );
  }

  if (sessionConfirmed) {
    const from = location.state?.from?.pathname || APP_ROUTES.HOME.ROOT;

    return <Navigate to={from} replace />;
  }

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
};
