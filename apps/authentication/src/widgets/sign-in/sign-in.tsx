import style from './sing-in.module.less';
import {Input} from '@common';

export const SignIn = () => {
  return (
    <div className={style.root}>
      <Input />
      <Input />
    </div>
  );
};
