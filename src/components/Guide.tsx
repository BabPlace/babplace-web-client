import React from 'react';
import styled from '@emotion/styled';

type Props = {
  isShowGuide: boolean;
  hideGuide?: () => void;
};

const Guide = ({ isShowGuide, hideGuide }: Props) => {
  return (
    <Container isShowGuide={isShowGuide}>
      Guide
      <button onClick={hideGuide}>hide</button>
    </Container>
  );
};

export default Guide;

const Container = styled.div<{ isShowGuide: boolean }>`
  position: fixed;

  width: 100%;
  height: 100%;
  background-color: #000000db;

  top: 0;
  left: 0;

  opacity: ${({ isShowGuide }) => (isShowGuide ? 1 : 0)};
  visibility: ${({ isShowGuide }) => (isShowGuide ? 'visible' : 'hidden')};
  z-index: ${({ isShowGuide }) => (isShowGuide ? 3000 : -1)};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;
