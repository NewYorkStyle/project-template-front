import style from './header.module.less';
import {LanguageSelect} from '../language-select/language-select';

export const Header = () => {
  return (
    <div className={style.root}>
      <LanguageSelect />
    </div>
  );
};
