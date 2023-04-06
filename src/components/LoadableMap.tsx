import React, { ComponentProps } from 'react';
import { Map } from 'react-kakao-maps-sdk';

type Props = ComponentProps<typeof Map> & {
  isLoading: boolean;
};

const LoadableMap = ({ isLoading, ...props }: Props) => {
  return isLoading ? <div>로딩중</div> : <Map {...props} />;
};

export default LoadableMap;
