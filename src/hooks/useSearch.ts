import { useState, useEffect, useCallback } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';

export default function useSearch(value: string, lat: number, lng: number) {
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [searchResults, setSearchResults] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState<kakao.maps.services.PlacesSearchResultItem | null>(null);

  const handleClickSearchResult = useCallback(
    (selectedSearchResult: kakao.maps.services.PlacesSearchResultItem) => {
      if (!ps) return;
      setSelectedSearchResult(selectedSearchResult);
    },
    [ps]
  );

  const clearSelectedSearchResult = () => {
    setSelectedSearchResult(null);
  };

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
          console.log(data);
          setSearchResults(data);
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lng),
      }
    );
  }, [value]);

  return { searchResults, selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult };
}
