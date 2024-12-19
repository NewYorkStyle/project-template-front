import style from './theme-change.module.less';
import {
  BulbLightningIcon,
  E_ANALYTIC_NAMESPACES,
  MoonIcon,
  Switch,
} from '@common';

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
        analyticProps={{
          label: 'dark-mode',
          namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
        }}
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
