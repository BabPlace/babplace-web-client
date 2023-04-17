import { useState, useEffect } from 'react';

export default function useSearch(value: string, lat: number, lng: number) {
  const [searchResult, setSearchResult] = useState<kakao.maps.services.PlacesSearchResult>([]);

  useEffect(() => {
    if (value.length === 0) {
      setSearchResult([]);
      return;
    }
    const ps = new kakao.maps.services.Places();
    const location = new kakao.maps.LatLng(lat, lng);
    ps.keywordSearch(
      value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResult(data);
        }
      },
      {
        location,
      }
    );
  }, [value]);

  return { searchResult };
}
