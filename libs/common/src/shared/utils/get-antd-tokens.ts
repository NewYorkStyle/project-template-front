import {designTokens} from '../constants';
import {ThemeConfig} from 'antd';

// Конфиг для Antd Theme
export const getAntdThemeConfig = (theme: 'light' | 'dark'): ThemeConfig => {
  const palette = designTokens.colors[theme];

  return {
    components: {
      Layout: {
        headerBg: palette.backgroundPrimary,
        headerPadding: designTokens.spacing.lg,
        triggerBg: 'transparent',
      },
      Select: {
        optionSelectedBg: palette.accentPrimary,
        optionSelectedFontWeight: 'normal',
      },
    },
    token: {
      borderRadius: 12,
      colorBgBase: palette.backgroundPrimary,
      colorBgContainer: palette.backgroundSecondary,
      colorTextBase: palette.textPrimary,
      colorTextPlaceholder: palette.textSecondary,
      fontFamily:
        "'Franklin Gothic Medium', 'Arial Narrow',\n  Arial,\n  sans-serif;",
      fontSize: designTokens.textSise.md,
    },
  };
};
