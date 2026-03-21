import {Flex} from '@new_york_style/project-template-ui';
import {useTranslation} from 'react-i18next';

import {AuthForm} from '@features';
import {Page} from '@shared';

import style from './auth.module.scss';

export const Auth = () => {
  const {t} = useTranslation('Auth');

  return (
    <Page title={t('Title')}>
      <Flex className={style.root} vertical align='center' justify='center'>
        <AuthForm />
      </Flex>
    </Page>
  );
};
