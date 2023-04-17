import React from 'react';
import cn from 'classnames';
import { useSwipeableButton } from '@/hooks';
import styles from '@/styles/SwipeableButton.module.css';
import styled from '@emotion/styled';

const SwipeableButton = () => {
  const { buttons, isShow, isDefault } = useSwipeableButton();
  return (
    <StyledButton className={cn(styles.container, styles['but' + isShow])} isCustom={!isDefault}>
      {buttons.map(({ children, onClick, className }, index) => {
        return (
          <button className={cn(styles.button, className ? styles[`${className}`] : '')} key={`swipablebutton-${index}`} onClick={onClick}>
            {children}
          </button>
        );
      })}
    </StyledButton>
  );
};

export default React.memo(SwipeableButton);

const StyledButton = styled.div<{ isCustom: boolean }>`
  transform: ${({ isCustom }) => (isCustom ? 'translateY(calc(var(--drawer-list-height) + var(--drawer-list-button-gap)))' : '')};
  transition: transform 0.5s ease-in-out;
`;
