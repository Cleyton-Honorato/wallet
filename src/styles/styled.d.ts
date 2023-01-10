import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: strug;

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
  
      textPrimaryColor: string;
      textSecondaryColor: string;
      textTertiaryColor: string;
  
      success: string;
      info: string;
      warning: string;
    }
  }
}