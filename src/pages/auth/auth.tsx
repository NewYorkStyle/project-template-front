import {observer} from 'mobx-react-lite';

import {AuthForm} from '@features';

import style from './auth.module.less';

export const Auth = observer(() => {
  return (
    <div className={style.root}>
      <AuthForm />
    </div>
  );
});
