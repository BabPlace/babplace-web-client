import React from 'react';
import { useDrawer } from '@/hooks';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  isHidden?: boolean;
};

const SwipeableEdgeDrawer = ({ children, isHidden }: Props) => {
  const { drawerRef, open } = useDrawer();
  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open} isHidden={isHidden}>
      <div className={styles.puller} />
      {children}
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean; isHidden?: boolean }>`
  && {
    min-height: ${({ isOpen }) => (isOpen ? 'var(--drawer-maximun-height)' : '1px')};
    bottom: ${({ isHidden }) => (isHidden ? '-100%' : '0')};
  }
`;
