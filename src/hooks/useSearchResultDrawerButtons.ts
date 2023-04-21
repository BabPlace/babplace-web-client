import { useCallback } from 'react';
import useAlert from './useAlert';

export default function useSearchResultDrawerButtons(
  selectedSearchResult: kakao.maps.services.PlacesSearchResultItem | null,
  reset: () => void,
  clearSelectedSearchResult: () => void,
  addSelects: (newSelect: kakao.maps.services.PlacesSearchResultItem) => void
) {
  const { open, handleOpen, handleClose } = useAlert();
  const clear = () => {
    reset();
    clearSelectedSearchResult();
  };

  const add = useCallback(() => {
    clear();
    if (!selectedSearchResult) return;
    addSelects(selectedSearchResult);
  }, [selectedSearchResult]);

  const share = useCallback(async () => {
    if (!selectedSearchResult) {
      return;
    }
    try {
      await navigator.share({
        title: selectedSearchResult.place_name,
        text: selectedSearchResult.road_address_name,
        url: selectedSearchResult.place_url,
      });
    } catch (error) {
      handleOpen();
      navigator.clipboard.writeText(selectedSearchResult.place_url);
    }
  }, [selectedSearchResult]);

  return { open, clear, add, share, handleClose };
}
