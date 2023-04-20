import { useState } from 'react';
import type { SelectPlace } from '@/interfaces';

export default function useCustom() {
  const [selects, setSelects] = useState<SelectPlace[]>([]);

  function addSelects(newSelect: SelectPlace) {
    setSelects((prevSelects) => [...prevSelects, newSelect]);
  }

  function clearSelects() {
    setSelects([]);
  }

  function deleteByIndex(index: number) {
    setSelects((prevSelects) => prevSelects.filter((_, i) => i !== index));
  }

  return { selects, addSelects, clearSelects, deleteByIndex };
}
