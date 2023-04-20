import { useState, useEffect, useCallback } from 'react';
import useAlert from './useAlert';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';

export default function useSearch(
  value: string,
  lat: number,
  lng: number,
  setLocation: ({ latitude, longitude }: { latitude?: number | undefined; longitude?: number | undefined }) => void
) {
  const { open, handleOpen, handleClose } = useAlert();
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [searchResults, setSearchResults] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState<kakao.maps.services.PlacesSearchResultItem | null>(null);

  const handleClickSearchResult = useCallback(
    (selectedSearchResult: kakao.maps.services.PlacesSearchResultItem) => {
      if (!ps) return;
      setSelectedSearchResult(selectedSearchResult);
      setLocation({
        latitude: parseFloat(selectedSearchResult.y),
        longitude: parseFloat(selectedSearchResult.x),
      });
    },
    [ps]
  );

  const clearSelectedSearchResult = () => {
    setSelectedSearchResult(null);
  };

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

  useEffect(() => {
    if (loading) return;
    setPs(new kakao.maps.services.Places());
  }, [loading]);

  useEffect(() => {
    if (!ps) return;
    if (value.length <= 1) {
      setSearchResults([]);
      return;
    }
    ps.keywordSearch(
      value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResults(data);
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lng),
      }
    );
  }, [value]);

  return { searchResults, selectedSearchResult, open, handleClose, share, handleClickSearchResult, clearSelectedSearchResult };
}
