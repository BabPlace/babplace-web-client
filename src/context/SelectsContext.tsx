import { createContext } from 'react';
import type { SelectPlace } from '@/interfaces';

export type SelectsContextType = {
  isShow: boolean;
  selects: SelectPlace[];
  show: () => void;
  hide: () => void;
  addSelects: (select: SelectPlace) => void;
  removeSelects: (select: SelectPlace) => void;
  removeSelectsByIndex: (index: number) => void;
  clearSelects: () => void;
};
export const SelectsContext = createContext<SelectsContextType>({
  isShow: false,
  selects: [],
  show: () => {},
  hide: () => {},
  addSelects: () => {},
  removeSelects: () => {},
  removeSelectsByIndex: () => {},
  clearSelects: () => {},
});
