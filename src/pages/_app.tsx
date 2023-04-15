import Head from 'next/head';
import { createContext } from 'react';
import { ThemeProvider } from '@mui/material';
import { useTheme } from '@/hooks';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export const ColorModeContext = createContext<{ toggleColorMode: () => void; mode: 'light' | 'dark' }>({
  toggleColorMode: () => {},
  mode: 'light',
});

export default function App({ Component, pageProps }: AppProps) {
  const { colorMode, theme } = useTheme();
  return (
    <>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' sizes='180x180' />
        <link rel='icon' href='/favicon-32x32.png' type='image/png' sizes='32x32' />
        <link rel='icon' href='/favicon-16x16.png' type='image/png' sizes='16x16' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
