import {useTheme} from '@entities';
import {
  BulbLightningIcon,
  E_METRICS_NAMESPACES,
  MoonIcon,
  Segmented,
} from '@shared';

/**
 * Компонент выбора темы.
 */
export const ThemeChange = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <Segmented
      analyticProps={{
        label: `theme-${theme === 'dark' ? 'light' : 'dark'}`,
        namespace: E_METRICS_NAMESPACES.APP_HEADER,
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
};
