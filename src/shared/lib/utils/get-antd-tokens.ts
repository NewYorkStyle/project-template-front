import {type ThemeConfig} from 'antd';

import {designTokens} from '../constants';

// Конфиг для Antd Theme
export const getAntdThemeConfig = (theme: 'light' | 'dark'): ThemeConfig => {
  const palette = designTokens.colors[theme];

  return {
    components: {
      Button: {
        dangerShadow: 'none',
        defaultShadow: 'none',
        primaryShadow: 'none',
      },
      Divider: {
        colorSplit: palette.borderPrimary,
      },
      Layout: {
        headerBg: palette.backgroundPrimary,
        headerPadding: designTokens.spacing.md,
        triggerBg: 'transparent',
      },
      Select: {
        optionSelectedBg: palette.accentPrimary,
        optionSelectedFontWeight: 'normal',
      },
      Typography: {
        fontSize: designTokens.textSise.md,
        fontSizeHeading1: designTokens.textSise.xl,
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
