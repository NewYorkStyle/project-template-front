import {Icon} from '@new_york_style/project-template-ui';

import {useTheme} from '@entities';
import {E_METRICS_NAMESPACES, Segmented} from '@shared';

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
        {icon: <Icon name='bulbLightning' />, value: 'light'},
        {icon: <Icon name='moon' />, value: 'dark'},
      ]}
      onChange={toggleTheme}
      value={theme}
      size='small'
    />
  );
};
