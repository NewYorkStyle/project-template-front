import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {AuthForm} from '@features';
import {Page} from '@shared';

import style from './auth.module.less';

export const Auth = observer(() => {
  const {t} = useTranslation('Auth');

  return (
    <Page title={t('Title')}>
      <div className={style.root}>
        <AuthForm />
      </div>
    </Page>
  );
});
