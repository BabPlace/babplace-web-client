import { useState } from 'react';
import type { SelectPlace } from '@/interfaces';

export default function useCustom() {
  const [selects, setSelects] = useState<SelectPlace[]>([]);

  function addSelects(newSelect: SelectPlace) {
    setSelects((prevSelects) => [...prevSelects, newSelect]);
  }

  return { selects, addSelects };
}
