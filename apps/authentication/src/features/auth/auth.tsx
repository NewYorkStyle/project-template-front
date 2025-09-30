import style from './auth.module.less';
import {SignIn, signInStore} from '../sign-in';
import {SignUp, signUpStore} from '../sign-up';
import {
  APP_VERSION,
  E_METRICS_NAMESPACES,
  Flex,
  TTabItem,
  Tabs,
  Typography,
} from '@common';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const Auth = () => {
  const {t} = useTranslation();

  const tabConfig: TTabItem[] = [
    {
      analyticsLabel: 'SignIn',
      children: <SignIn />,
      key: 'sign-in',
      label: t('Authentication.SignIn.Label'),
    },
    {
      analyticsLabel: 'SignUp',
      children: <SignUp />,
      key: 'sign-up',
      label: t('Authentication.SignUp.Label'),
    },
  ];

  useEffect(
    () => () => {
      signInStore.clear();
      signUpStore.clear();
    },
    []
  );

  return (
    <div className={style.root}>
      <Typography.Title>{t('Welcome')}</Typography.Title>
      <div className={style.tabsWrapper}>
        <Tabs
          items={tabConfig}
          analyticProps={{
            label: 'Auth tabs',
            namespace: E_METRICS_NAMESPACES.AUTH,
          }}
        />
        <Flex justify='center'>
          <Typography.Text type='secondary'>
            {t('Authentication.Version')}: {APP_VERSION}
          </Typography.Text>
        </Flex>
      </div>
    </div>
  );
};
