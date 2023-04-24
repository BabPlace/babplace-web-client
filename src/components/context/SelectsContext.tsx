import { createContext } from 'react';
import type { SelectPlace } from '@/interfaces';

export type SelectsContextType = {
  selects: SelectPlace[];
  addSelects: (select: SelectPlace) => void;
  removeSelects: (select: SelectPlace) => void;
  removeSelectsByIndex: (index: number) => void;
  clearSelects: () => void;
};
export const SelectsContext = createContext<SelectsContextType>({
  selects: [],
  addSelects: () => {},
  removeSelects: () => {},
  removeSelectsByIndex: () => {},
  clearSelects: () => {},
});
