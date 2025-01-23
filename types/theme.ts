export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ThemeColors {
  primary: Record<ColorShade, string>;
  gold: Record<ColorShade, string>;
  accent: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface ButtonVariant {
  primary: string;
  secondary: string;
  outline: string;
}

export interface SectionVariant {
  default: string;
  dark: string;
  light: string;
  gradient: string;
}

export interface HeadingVariant {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
}

export interface CardVariant {
  default: string;
  gradient: string;
}

// Helper type for theme values
export type ThemeValue<T> = {
  readonly [K in keyof T]: string;
}