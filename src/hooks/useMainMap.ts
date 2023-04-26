import { useState, useEffect, useCallback } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import useQuery from './useQuery';
import debounce from 'lodash/debounce';

export type SetLocation = ({ latitude, longitude }: { latitude?: number | undefined; longitude?: number | undefined }) => void;

const defaultLocation = {
  latitude: 37.566826,
  longitude: 126.9786567,
};

export default function useMainMap() {
  const { isDefault } = useQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState(defaultLocation.latitude);
  const [longitude, setLongitude] = useState(defaultLocation.longitude);
  const [addressName, setAdressName] = useState('-');

  const { loading } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ['services', 'clusterer'],
  });

  const setLocation: SetLocation = ({ latitude, longitude }) => {
    if (latitude) setLatitude(latitude);
    if (longitude) setLongitude(longitude);
  };

  const onCenterChanged = (map: kakao.maps.Map) => {
    setLocation({
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
  };
  const onCenterChangedDebounced = useCallback(debounce(onCenterChanged, 750), []);

  useEffect(() => {
    if (loading || !isLoading || !isDefault) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result: kakao.maps.services.RegionCode[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAdressName(result[0].address_name);
      }
    };
    geocoder.coord2RegionCode(longitude, latitude, callback);
  }, [loading, latitude, longitude, isDefault]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(true);
      },
      (error) => {
        setIsLoading(true);
      }
    );
  }, []);

  return {
    loading: loading ? loading : !isLoading,
    location: { lat: latitude, lng: longitude },
    addressName,
    setLocation,
    onCenterChanged: onCenterChangedDebounced,
  };
}
