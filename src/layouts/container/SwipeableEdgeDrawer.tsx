import React from 'react';
import { useDrawer, useQuery } from '@/hooks';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  height?: string | number;
  isHidden?: boolean;
};

const SwipeableEdgeDrawer = ({ children, height, isHidden }: Props) => {
  const { drawerRef, open } = useDrawer();
  const { isDefault } = useQuery();
  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open} isHidden={isHidden} height={height} isDefault={isDefault}>
      <div className={styles.puller} />
      {children}
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean; isHidden?: boolean; height?: string | number; isDefault: boolean }>`
  && {
    min-height: ${({ isOpen, isDefault }) =>
      isOpen
        ? 'var(--drawer-maximun-height)'
        : isDefault
        ? 'var(--drawer-default-height)'
        : 'calc(var(--drawer-default-height) - var(--drawer-list-height) * 2)'};
    bottom: ${({ isHidden }) => (isHidden ? '-100%' : '0')};
    height: ${({ height }) => height};
    z-index: ${({ isOpen }) => (isOpen ? '2' : '0')};
  }
`;
