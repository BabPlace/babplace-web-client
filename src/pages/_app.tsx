import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import { ColorModeContext, SelectsContext } from '@/components';
import { useTheme, useSelects, useServiceWorker } from '@/hooks';
import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps & { emotionCache: any }) {
  const { colorMode, theme } = useTheme();
  const selects = useSelects();

  useServiceWorker();

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      </Head>
      <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={colorMode}>
          <SelectsContext.Provider value={selects}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </SelectsContext.Provider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </>
  );
}
