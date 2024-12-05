import style from './placeholder.module.less';
import {Button} from '@common';

export const Placeholder = () => {
  return (
    <div className={style.root}>
      <span className={style.placeholder}>Здесь могла быть ваша реклама</span>
      <Button className={style.button}>Но не получилось</Button>
    </div>
  );
};
