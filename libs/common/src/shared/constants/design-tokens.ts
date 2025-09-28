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
};

export const designTokens: TDesignTokens = {
  borderRadius: {
    lg: 14,
    md: 12,
    sm: 10,
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
    lg: 24,
    md: 16,
    sm: 8,
    xs: 4,
  },
  textSise: {
    md: 16,
    sm: 14,
  },
};
