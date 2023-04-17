import { useState, useEffect } from 'react';

export default function useSearch(value: string, lat: number, lng: number) {
  const [searchResult, setSearchResult] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const [ps, setPs] = useState<kakao.maps.services.Places>();

  useEffect(() => {
    setPs(new kakao.maps.services.Places());
  }, []);

  useEffect(() => {
    if (!ps) return;
    if (value.length <= 1) {
      setSearchResult([]);
      return;
    }
    ps.keywordSearch(
      value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
          setSearchResult(data);
        }
      },
      {
        location: new kakao.maps.LatLng(lat, lng),
      }
    );
  }, [value]);

  return { searchResult };
}
