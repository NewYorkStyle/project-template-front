import {observer} from 'mobx-react-lite';

import {Auth} from '@features';

import style from './authentication.module.less';

export const Authentication = observer(() => {
  return (
    <div className={style.root}>
      <Auth />
    </div>
  );
});
