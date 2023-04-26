import React from 'react';
import styled from '@emotion/styled';
import styles from '@/styles/FullScreenModal.module.css';

type Props = {
  isShow: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const FullScreenModal = ({ isShow, children, ...props }: Props) => {
  return (
    <Container isShow={isShow} className={styles.container} {...props}>
      {children}
    </Container>
  );
};

export default FullScreenModal;

const Container = styled.div<{ isShow: boolean }>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  z-index: ${({ isShow }) => (isShow ? 'var(--guide-show-z-index)' : 'var(--guide-hide-z-index)')};
`;
