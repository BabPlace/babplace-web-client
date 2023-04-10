import Head from 'next/head';
import { useMemo, useState, createContext, useEffect } from 'react';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log('in toggle');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#47B8E0',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                '&.Mui-disabled': {
                  background: 'rgb(var(--disabled-background-rgb))',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    console.log(mode);
    if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [mode]);

  return (
    <>
      <Head>
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
