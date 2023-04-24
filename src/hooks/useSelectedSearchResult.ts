import { useState } from 'react';
import type { SetLocation } from '@/hooks/useMainMap';

export default function useSelectedSearchResult(setLocation: SetLocation) {
  const [selectedSearchResult, setSelectedSearchResult] = useState<kakao.maps.services.PlacesSearchResultItem | null>(null);

  const handleClickSearchResult = (selectedSearchResult: kakao.maps.services.PlacesSearchResultItem) => {
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
