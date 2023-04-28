import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import { ColorModeContext, SelectsContext } from '@/components';
import { useTheme, useSelects, useServiceWorker } from '@/hooks';
import '@/styles/globals.css';
import Script from 'next/script'
import * as gtag from '../lib/gtag'

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
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
