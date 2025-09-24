import style from './auth.module.less';
import {signInStore, signUpStore} from '../../entities/stores';
import {SignIn} from '../sign-in/sign-in';
import {SignUp} from '../sign-up/sign-up';
import {E_ANALYTIC_NAMESPACES, TTabItem, Tabs, Typography} from '@common';
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
            namespace: E_ANALYTIC_NAMESPACES.AUTH,
          }}
        />
      </div>
    </div>
  );
};
