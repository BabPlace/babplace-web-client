import { createContext } from 'react';

export type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});
