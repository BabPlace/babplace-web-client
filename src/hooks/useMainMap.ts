import { useState, useEffect } from 'react';
import { useInjectKakaoMapApi } from 'react-kakao-maps-sdk';

const defaultLocation = {
  latitude: 37.566826,
  longitude: 126.9786567,
};

export default function useMainMap() {
  const [latitude, setLatitude] = useState(defaultLocation.latitude);
  const [longitude, setLongitude] = useState(defaultLocation.longitude);
  const [addressName, setAdressName] = useState('');

  const { loading } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? '',
  });

  const setLocation = ({ latitude, longitude }: { latitude?: number; longitude?: number }) => {
    if (latitude) setLatitude(latitude);
    if (longitude) setLongitude(longitude);
  };

  const onCenterChanged = (map: kakao.maps.Map) => {
    setLocation({
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
  };

  useEffect(() => {
    if (loading) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result: kakao.maps.services.RegionCode[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAdressName(result[0].address_name);
      }
    };
    geocoder.coord2RegionCode(longitude, latitude, callback);
  }, [loading]);

  useEffect(() => {
    console.log(addressName);
  }, [addressName]);

  return { latitude, longitude, addressName, onCenterChanged };
}