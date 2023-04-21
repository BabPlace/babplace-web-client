import { useEffect, createContext } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material';
import { useTheme } from '@/hooks';
import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = createContext<{ toggleColorMode: () => void; mode: 'light' | 'dark' }>({
  toggleColorMode: () => {},
  mode: 'light',
});

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps & { emotionCache: any }) {
  const { colorMode, theme } = useTheme();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/sw.js');

        registration.waiting?.postMessage('SKIP_WAITING');
      };
      registInit();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      </Head>
      <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </>
  );
}
