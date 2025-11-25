import {useTranslation} from 'react-i18next';

import {
  E_METRICS_NAMESPACES,
  Flex,
  Spin,
  Tabs,
  type TTabItem,
  Typography,
} from '@shared';

import packageJson from '../../../../../package.json';
import {useSignIn, useSignUp} from '../../api';
import {SignIn} from '../sign-in';
import {SignUp} from '../sign-up';

import style from './auth-form.module.scss';

export const AuthForm = () => {
  const {t} = useTranslation('Auth');

  const {isPending: isSignInLoading} = useSignIn();
  const {isPending: isSignUpLoading} = useSignUp();

  const loading = isSignInLoading || isSignUpLoading;

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

  return (
    <Flex className={style.root} vertical align='center' justify='center'>
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
    </Flex>
  );
};
