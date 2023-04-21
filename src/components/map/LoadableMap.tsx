import React, { useState, ComponentProps, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import Loading from './Loading';

type Props = ComponentProps<typeof Map> & {
  style: React.CSSProperties;
  isLoading: boolean;
};

const LoadableMap = ({ isLoading, ...props }: Props) => {
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    if (map) map.relayout();
  }, [map, props.style]);

  return isLoading ? <Loading {...props.style} /> : <Map onCreate={setMap} {...props} />;
};

export default LoadableMap;
