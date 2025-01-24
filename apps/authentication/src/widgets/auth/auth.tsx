import style from './auth.module.less';
import {signInStore, signUpStore} from '../../entities/stores';
import {SignIn} from '../sign-in/sign-in';
import {SignUp} from '../sign-up/sign-up';
import {E_ANALYTIC_NAMESPACES, TTab, Tabs} from '@common';
import {useEffect} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Auth = withTranslation()(({i18n: {t}}: TProps) => {
  const tabConfig: TTab[] = [
    {
      analyticsLabel: 'SignIn',
      content: <SignIn />,
      label: t('Authentication.SignIn.Label'),
    },
    {
      analyticsLabel: 'SignUp',
      content: <SignUp />,
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
      <h1>{t('Welcome')}</h1>
      <Tabs
        tabs={tabConfig}
        analyticProps={{
          label: 'Auth tabs',
          namespace: E_ANALYTIC_NAMESPACES.AUTH,
        }}
      />
    </div>
  );
});
