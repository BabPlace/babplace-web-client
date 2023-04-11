import { useMemo, useState, useEffect } from 'react';
import { createTheme, useMediaQuery } from '@mui/material';

export default function useTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isInit, setIsInit] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
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
    if (!isInit) {
      setIsInit(true);
      return;
    }
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [mode]);

  return { colorMode, theme };
}
