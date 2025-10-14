import {observer} from 'mobx-react-lite';

import {paramsStore} from '@entities';
import {
  BulbLightningIcon,
  E_METRICS_NAMESPACES,
  MoonIcon,
  Segmented,
} from '@shared';

/**
 * Компонент выбора темы.
 */
export const ThemeChange = observer(() => {
  const {theme, toggleTheme} = paramsStore;

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
});
