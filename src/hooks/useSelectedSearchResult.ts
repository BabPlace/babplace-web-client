import { useState, useContext } from 'react';
import type { SelectPlace } from '@/interfaces';
import { LocationContext } from '@/context';

export default function useSelectedSearchResult() {
  const { setLocation } = useContext(LocationContext);
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
