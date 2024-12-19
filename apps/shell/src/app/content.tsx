import style from './app.module.less';
import {Router} from './router';
import {Header} from '../widgets/header/header';

export const Content = () => (
  <div className={style.root}>
    <Header />
    <div className={style.content}>
      <Router />
    </div>
  </div>
);
