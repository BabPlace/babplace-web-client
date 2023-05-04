import { useCallback, useContext } from 'react';
import useAlert from './useAlert';
import type { SelectPlace } from '@/interfaces';
import { SelectsContext } from '@/context';

export default function useSearchResultDrawerButtons(
  selectedSearchResult: SelectPlace | null,
  reset: () => void,
  clearSelectedSearchResult: () => void
) {
  const { addSelects } = useContext(SelectsContext);
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
