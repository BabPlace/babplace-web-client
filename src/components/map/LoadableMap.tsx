import React, { useState, ComponentProps, useEffect, useContext } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import Loading from '../loading/Loading';
import { LocationContext } from '@/context';

type Props = Omit<ComponentProps<typeof Map>, 'center'> & {
  style: React.CSSProperties;
  isLoading: boolean;
};

const LoadableMap = ({ isLoading, ...props }: Props) => {
  const { location } = useContext(LocationContext);
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    if (map) map.relayout();
  }, [map, props.style]);

  useEffect(() => {
    if (map) map.panTo(new kakao.maps.LatLng(location.latitude, location.longitude));
  }, [map, location]);

  return isLoading ? (
    <Loading {...props.style} />
  ) : (
    <Map onCreate={setMap} isPanto={true} center={{ lat: 37.566826, lng: 126.9786567 }} {...props} />
  );
};

export default LoadableMap;
