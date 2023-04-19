import React, { ComponentProps } from 'react';
import Loading from './Loading';
import { Map } from 'react-kakao-maps-sdk';

type Props = ComponentProps<typeof Map> & {
  style: React.CSSProperties;
  isLoading: boolean;
};

const LoadableMap = ({ isLoading, ...props }: Props) => {
  return isLoading ? <Loading {...props.style} /> : <Map {...props} />;
};

export default LoadableMap;
