import React, { ComponentProps } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import Loading from './Loading';

type Props = ComponentProps<typeof Map> & {
  style: React.CSSProperties;
  isLoading: boolean;
};

const LoadableMap = ({ isLoading, ...props }: Props) => {
  return isLoading ? <Loading {...props.style} /> : <Map {...props} />;
};

export default LoadableMap;
