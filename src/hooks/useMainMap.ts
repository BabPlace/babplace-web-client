import { useState, useEffect, useCallback, useContext } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import useQuery from './useQuery';
import debounce from 'lodash/debounce';
import { LocationContext } from '@/context';

export default function useMainMap() {
  const { isFetch, location, setLocation } = useContext(LocationContext);
  const { isDefault } = useQuery();
  const [addressName, setAdressName] = useState('-');

  const { loading } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ['services', 'clusterer'],
  });

  const onCenterChanged = (map: kakao.maps.Map) => {
    setLocation({
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
  };
  const onCenterChangedDebounced = useCallback(debounce(onCenterChanged, 750), []);

  useEffect(() => {
    if (loading || !isFetch || !isDefault) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result: kakao.maps.services.RegionCode[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAdressName(result[0].address_name);
      }
    };
    geocoder.coord2RegionCode(location.longitude, location.latitude, callback);
  }, [loading, location, isDefault]);

  return {
    loading: loading ? loading : !isFetch,
    addressName,
    onCenterChanged: onCenterChangedDebounced,
  };
}
