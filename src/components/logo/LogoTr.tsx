import React, { ImgHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type Props = {
  width?: string | number;
  height?: string | number;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const LogoTr = (props: Props) => {
  return <LogoStyled src='/icons/icon-tr-512x512.png' {...props} />;
};

export default LogoTr;

const LogoStyled = styled.img<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
