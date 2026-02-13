export type TColorPalette = {
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;

  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundElevated: string;

  borderPrimary: string;
  borderSecondary: string;

  accentPrimary: string;
  accentHover: string;
  accentActive: string;
};

export type TDesignTokens = {
  colors: {
    light: TColorPalette;
    dark: TColorPalette;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  textSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  breakpoints: {
    phone: number;
    tablet: number;
    tabletLg: number;
    desktop: number;
    desktopLg: number;
    desktopXl: number;
  };
};

export const designTokens: TDesignTokens = {
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  breakpoints: {
    phone: 480,
    tablet: 768,
    tabletLg: 1024,
    desktop: 1280,
    desktopLg: 1440,
    desktopXl: 1920,
  },
  colors: {
    light: {
      textPrimary: '#000000',
      textSecondary: '#6B6B6B',
      textDisabled: '#A4A6A8',

      backgroundPrimary: '#CBCBCB',
      backgroundSecondary: '#D9D9DC',
      backgroundElevated: '#FFFFFF',

      borderPrimary: '#C1C0C0',
      borderSecondary: '#E0E0E0',

      accentPrimary: '#4594D1',
      accentHover: '#5AA3DB',
      accentActive: '#2F7AB8',
    },
    dark: {
      textPrimary: '#CBCDD0',
      textSecondary: '#A4A6A8',
      textDisabled: '#7A7C7E',

      backgroundPrimary: '#383535',
      backgroundSecondary: '#4B4948',
      backgroundElevated: '#5A5857',

      borderPrimary: '#545353',
      borderSecondary: '#6A6867',

      accentPrimary: '#4594D1',
      accentHover: '#5AA3DB',
      accentActive: '#2F7AB8',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  textSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 24,
    xl: 36,
  },
};
