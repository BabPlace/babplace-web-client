import React from 'react';
import cn from 'classnames';
import { Backdrop } from '@mui/material';
import styled from '@emotion/styled';
import styles from '@/styles/Guide.module.css';

type Props = {
  isShow: boolean;
  hide: () => void;
  children?: React.ReactNode;
  animationDelay?: boolean;
};

const Modal = ({ isShow, hide, children, animationDelay = true }: Props) => {
  return (
    <>
      <Backdrop open={isShow} onClick={hide} sx={{ zIndex: 'var(--guide-show-z-index)' }} />
      <Container isShow={isShow} className={cn(styles.container, animationDelay ? styles.delay : styles.nodelay)}>
        {children}
      </Container>
    </>
  );
};

export default Modal;

const Container = styled.div<{ isShow: boolean }>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  z-index: ${({ isShow }) => (isShow ? 'var(--guide-show-z-index)' : 'var(--guide-hide-z-index)')};
  background: rgb(var(--primary-background-rgb));
`;
