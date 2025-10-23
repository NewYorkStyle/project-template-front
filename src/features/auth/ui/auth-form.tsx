import {useEffect} from 'react';

import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {
  E_METRICS_NAMESPACES,
  Flex,
  Spin,
  Tabs,
  type TTabItem,
  Typography,
} from '@shared';

import packageJson from '../../../../package.json';
import {signInStore, signUpStore} from '../model';

import style from './auth-form.module.less';
import {SignIn} from './sign-in';
import {SignUp} from './sign-up';

export const AuthForm = observer(() => {
  const loading = signInStore.isLoading || signUpStore.isLoading;
  const {t} = useTranslation('Auth');

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
      <Typography.Title>{t('Title')}</Typography.Title>
      <Spin spinning={loading}>
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
              {t('Authentication.Version')}: {packageJson.version}
            </Typography.Text>
          </Flex>
        </div>
      </Spin>
    </div>
  );
});
