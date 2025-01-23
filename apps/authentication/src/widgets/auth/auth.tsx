import style from './auth.module.less';
import {SignIn} from '../sign-in/sign-in';
import {SignUp} from '../sign-up/sign-up';
import {TTab, Tabs} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Auth = withTranslation()(({i18n: {t}}: TProps) => {
  const tabConfig: TTab[] = [
    {
      content: <SignIn />,
      label: t('Authentication.SignIn.Label'),
    },
    {
      content: <SignUp />,
      label: t('Authentication.SignUp.Label'),
    },
  ];

  return (
    <div className={style.root}>
      <h1>{t('Welcome')}</h1>
      <Tabs tabs={tabConfig} />
    </div>
  );
});
