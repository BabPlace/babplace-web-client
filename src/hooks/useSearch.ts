import { useState, useEffect } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { useDebouncedValue, useQuery } from '@/hooks';

export default function useSearch(value: string, location: { lat: number; lng: number }) {
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [searchResults, setSearchResults] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const debouncedValue = useDebouncedValue(value, 500);
  const { setQuery } = useQuery();

  const keywordSearch = (debouncedValue: string) => {
    if (!ps) return;
    if (debouncedValue.length <= 1) {
      resetResults();
      return;
    }
    ps.keywordSearch(
      debouncedValue,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log('insearch : ', debouncedValue);
          setSearchResults(data);
        }
      },
      {
        location: new kakao.maps.LatLng(location.lat, location.lat),
      }
    );
  };

  const resetResults = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    if (debouncedValue.length === 0) {
      resetResults();
      return;
    }
    keywordSearch(debouncedValue);
    setQuery('search', 'true');
  }, [debouncedValue]);

  useEffect(() => {
    if (loading) return;
    setPs(new kakao.maps.services.Places());
  }, [loading]);

  return { searchResults };
}
