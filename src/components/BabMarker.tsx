import React from 'react';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

const BabMarker = () => {
  const theme = useTheme();

  return <StyledBabMarker bgColor={theme.myPalette[theme.palette.mode].verygood} />;
};

export default BabMarker;

const StyledBabMarker = styled.div<{ bgColor: string }>`
  &::after {
    position: absolute;
    content: '🍚';
    width: 1rem;
    height: 1rem;
    font-size: 1rem;
    background: ${(props) => props.bgColor};
    padding: 0.5rem;
    border-radius: 50%;
    line-height: 1;
    top: calc((100% - var(--drawer-default-height) + var(--header-default-height) + var(--border-radius) + 7px) / 2 - 2.1rem);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  &::before {
    position: absolute;
    content: '';
    border-top: 2rem solid ${(props) => props.bgColor};
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    top: calc((100% - var(--drawer-default-height) + var(--header-default-height) + var(--border-radius) + 7px) / 2 - 1rem);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
`;
