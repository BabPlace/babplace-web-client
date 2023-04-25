import { useState } from 'react';
import type { SetLocation } from '@/hooks/useMainMap';
import type { SelectPlace } from '@/interfaces';

export default function useSelectedSearchResult(setLocation: SetLocation) {
  const [selectedSearchResult, setSelectedSearchResult] = useState<SelectPlace | null>(null);

  const handleClickSearchResult = (selectedSearchResult: SelectPlace) => {
    setSelectedSearchResult(selectedSearchResult);
    setLocation({
      latitude: parseFloat(selectedSearchResult.y),
      longitude: parseFloat(selectedSearchResult.x),
    });
  };

  const clearSelectedSearchResult = () => {
    setSelectedSearchResult(null);
  };

  return { selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult };
}
