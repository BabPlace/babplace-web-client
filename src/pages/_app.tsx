import '@/styles/globals.css';
import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { myPalette } from '@/theme';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        myPalette,
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export type MyColors = {
  background: string;
  boxBackground: string;
  foreground: string;
  good: string;
  verygood: string;
  bad: string;
  verybad: string;
};
export type MyColorsOption = {
  [key in keyof MyColors]?: string;
};

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      dark: MyColors;
      light: MyColors;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    myPalette?: {
      dark?: MyColorsOption;
      light?: MyColorsOption;
    };
  }
}
