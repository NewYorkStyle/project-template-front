import style from './header.module.less';
import {Home} from '../home/home';
import {LanguageSelect} from '../language-select/language-select';
import {ThemeChange} from '../theme-change/theme-change';
import {UserIcon} from '../user-icon/user-icon';

/**
 * Шапка страницы.
 */
export const Header = () => {
  return (
    <div className={style.root}>
      <section className={style.left}>
        <Home />
      </section>
      <section className={style.right}>
        <ThemeChange />
        <LanguageSelect />
        <UserIcon />
      </section>
    </div>
  );
};
