export type TColorPalette = {
  textPrimary: string;
  textSecondary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  borderPrimary: string;
  accentPrimary: string;
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
  textSise: {
    sm: number;
    md: number;
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
    md: 12,
    lg: 14,
    sm: 10,
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
    dark: {
      accentPrimary: '#4594d1',
      backgroundPrimary: '#383535',
      backgroundSecondary: '#4b4948',
      borderPrimary: '#545353',
      textPrimary: '#CBCDD0',
      textSecondary: '#A4A6A8',
    },
    light: {
      accentPrimary: '#4594d1',
      backgroundPrimary: '#FFFFFF',
      backgroundSecondary: '#D9D9DC',
      borderPrimary: '#C1C0C0',
      textPrimary: '#000000',
      textSecondary: '#A4A6A8',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  textSise: {
    sm: 14,
    md: 16,
  },
};
