import {designTokens} from '../../constants';
import {getAntdThemeConfig} from '../get-antd-tokens';

describe('getAntdThemeConfig', () => {
  it('should return light theme config', () => {
    const config = getAntdThemeConfig('light');

    expect(config).toBeDefined();
    expect(config.token).toBeDefined();
    expect(config.components).toBeDefined();

    // Проверяем структуру токенов
    expect(config.token?.colorBgBase).toBe(
      designTokens.colors.light.backgroundPrimary
    );
    expect(config.token?.colorTextBase).toBe(
      designTokens.colors.light.textPrimary
    );
    expect(config.token?.borderRadius).toBe(12);
  });

  it('should return dark theme config', () => {
    const config = getAntdThemeConfig('dark');

    expect(config).toBeDefined();
    expect(config.token).toBeDefined();
    expect(config.components).toBeDefined();

    // Проверяем структуру токенов
    expect(config.token?.colorBgBase).toBe(
      designTokens.colors.dark.backgroundPrimary
    );
    expect(config.token?.colorTextBase).toBe(
      designTokens.colors.dark.textPrimary
    );
    expect(config.token?.borderRadius).toBe(12);
  });

  it('should have correct component configurations', () => {
    const config = getAntdThemeConfig('light');

    expect(config.components?.Button).toEqual({
      dangerShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
    });

    expect(config.components?.Select).toEqual({
      optionSelectedBg: designTokens.colors.light.accentPrimary,
      optionSelectedFontWeight: 'normal',
    });

    expect(config.components?.Layout).toEqual({
      headerBg: designTokens.colors.light.backgroundPrimary,
      headerPadding: designTokens.spacing.lg,
      triggerBg: 'transparent',
    });
  });

  it('should have consistent token structure for both themes', () => {
    const lightConfig = getAntdThemeConfig('light');
    const darkConfig = getAntdThemeConfig('dark');

    // Проверяем что структура одинаковая для обеих тем
    expect(Object.keys(lightConfig.token || {})).toEqual(
      Object.keys(darkConfig.token || {})
    );
    expect(Object.keys(lightConfig.components || {})).toEqual(
      Object.keys(darkConfig.components || {})
    );
  });
});
