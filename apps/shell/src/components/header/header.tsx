import style from './header.module.less';
import {LanguageSelect} from '../language-select/language-select';
import {ThemeChange} from '../theme-change/theme-change';

export const Header = () => {
  return (
    <div className={style.root}>
      <ThemeChange />
      <LanguageSelect />
    </div>
  );
};
