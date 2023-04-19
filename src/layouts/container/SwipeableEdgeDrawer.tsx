import React from 'react';
import { useDrawer } from '@/hooks';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
};

const SwipeableEdgeDrawer = ({ children }: Props) => {
  const { drawerRef, open } = useDrawer();
  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.puller} />
      {children}
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean }>`
  min-height: ${({ isOpen }) => (isOpen ? 'var(--drawer-maximun-height)' : '1px')};
`;
