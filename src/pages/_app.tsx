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
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
