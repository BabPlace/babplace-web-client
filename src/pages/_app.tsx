import '@/styles/globals.css';
import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { myPalette } from '@/theme';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#47B8E0',
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        myPalette,
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
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
