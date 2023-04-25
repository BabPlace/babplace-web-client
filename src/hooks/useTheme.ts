import { useMemo, useState, useEffect } from 'react';
import { createTheme, useMediaQuery } from '@mui/material';

export default function useTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#1886db',
          },
          neutral: {
            main: 'rgb(var(--tertiary-background-rgb))',
            contrastText: '#fff',
          },
          like: {
            main: '#ff6392',
            contrastText: '#fff',
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
          MuiIconButton: {
            styleOverrides: {
              root: {
                '&': {
                  color: 'rgba(var(--primary-foreground-rgba))',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    // @ts-ignore
    if (window.navigator.standalone) {
      document.documentElement.style.setProperty('--max-height', '100lvh');
    }
  }, []);

  useEffect(() => {
    if (prefersDarkMode) setMode('dark');
    else setMode('light');
  }, [prefersDarkMode]);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [mode]);

  return { colorMode, theme };
}
