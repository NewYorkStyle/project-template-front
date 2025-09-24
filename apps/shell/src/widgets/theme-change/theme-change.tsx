import {
  BulbLightningIcon,
  E_ANALYTIC_NAMESPACES,
  MoonIcon,
  Segmented,
  paramsStore,
} from '@common';
import {observer} from 'mobx-react-lite';

/**
 * Компонент выбора темы.
 */
export const ThemeChange = observer(() => {
  const {theme, toggleTheme} = paramsStore;

  return (
    <Segmented
      analyticProps={{
        label: `theme-${theme === 'dark' ? 'light' : 'dark'}`,
        namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
      }}
      shape='round'
      options={[
        {icon: <BulbLightningIcon />, value: 'light'},
        {icon: <MoonIcon />, value: 'dark'},
      ]}
      onChange={toggleTheme}
      value={theme}
      size='small'
    />
  );
});
