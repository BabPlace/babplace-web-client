import React from 'react';
import { useDrawer, useQuery } from '@/hooks';
import cn from 'classnames';
import Visible from './Visible';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  height?: string | number;
  hidden?: boolean;
  swipeable?: boolean;
};

const SwipeableEdgeDrawer = ({ children, height, hidden, swipeable = true }: Props) => {
  const { drawerRef, open } = useDrawer(swipeable);
  const { isDefault } = useQuery();
  return (
    <StyledDrawer
      className={cn(styles.container, styles[hidden ? 'hidden' : 'no_hidden'], styles[swipeable ? 'swipeable' : 'no_swipeable'])}
      ref={drawerRef}
      height={height}
      isOpen={open}
      isDefault={isDefault}
    >
      <Visible visible={swipeable} className={styles.puller} />
      {children}
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean; height?: string | number; isDefault: boolean }>`
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
