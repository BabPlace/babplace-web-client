import React from 'react';
import { useDrawer, useQuery } from '@/hooks';
import cn from 'classnames';
import Visible from './Visible';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  height?: string | number;
  isHidden?: boolean;
  swipeUp?: boolean;
  showPuller?: boolean;
};

const SwipeableEdgeDrawer = ({ children, height, isHidden, swipeUp = true, showPuller = true }: Props) => {
  const { drawerRef, open } = useDrawer(swipeUp);
  const { isDefault } = useQuery();
  return (
    <StyledDrawer
      className={cn(styles.container, isHidden ? styles.hidden : '')}
      ref={drawerRef}
      isOpen={open}
      isHidden={isHidden}
      height={height}
      isDefault={isDefault}
    >
      <Visible visible={showPuller} className={styles.puller} />
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
    height: ${({ height }) => height};
    z-index: ${({ isOpen }) => (isOpen ? '2' : '0')};
  }
`;
