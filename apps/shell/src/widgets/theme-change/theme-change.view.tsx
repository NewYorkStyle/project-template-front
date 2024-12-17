import style from './theme-change.module.less';
import {E_ANALYTIC_NAMESPACES, MoonIcon, SunIcon, Switch} from '@common';

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
      {darkMode ? <SunIcon /> : <MoonIcon size={18} />}
      <Switch
        analyticProps={{
          label: 'dark-mode',
          namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
        }}
        checked={darkMode}
        onChange={onChange}
      />
    </div>
  );
};
