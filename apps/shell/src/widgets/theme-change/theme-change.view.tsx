import style from './theme-change.module.less';
import {BulbLightningIcon, MoonIcon, Switch} from '@common';

/**
 * @prop {boolean} darkMode Выбранный режим.
 * @prop {() => void} onChange Обработчик изменения.
 */
type TProps = {
  darkMode: boolean;
  onChange: () => void;
};

/**
 * Компонент выбора темы.
 */
export const ThemeChangeView = ({darkMode, onChange}: TProps) => {
  return (
    <div className={style.root}>
      <Switch
        checked={darkMode}
        onChange={onChange}
        icons={{
          checked: <BulbLightningIcon size={16} />,
          unchecked: <MoonIcon size={16} />,
        }}
      />
    </div>
  );
};
