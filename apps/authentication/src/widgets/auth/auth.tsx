import {SignIn} from '../sign-in/sign-in';
import {SignUp} from '../sign-up/sign-up';
import {TTab, Tabs} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Auth = withTranslation()(({i18n: {t}}: TProps) => {
  const tabConfig: TTab[] = [
    {
      content: <SignIn />,
      label: t('Authentication.SignIn'),
    },
    {
      content: <SignUp />,
      label: t('Authentication.SignUp'),
    },
  ];

  return <Tabs tabs={tabConfig} />;
});
