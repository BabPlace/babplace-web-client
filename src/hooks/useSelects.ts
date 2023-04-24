import { useState, useEffect } from 'react';
import type { SelectPlace } from '@/interfaces';

export default function useSelect() {
  const [selects, setSelects] = useState<SelectPlace[]>([]);

  function addSelects(select: SelectPlace) {
    setSelects([...selects, select]);
  }

  function removeSelects(select: SelectPlace) {
    setSelects(selects.filter((s) => s.id !== select.id));
  }

  function removeSelectsByIndex(index: number) {
    setSelects(selects.filter((_, i) => i !== index));
  }

  function clearSelects() {
    setSelects([]);
  }

  return { selects, addSelects, removeSelects, removeSelectsByIndex, clearSelects };
}
