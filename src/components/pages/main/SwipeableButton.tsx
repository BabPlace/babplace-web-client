import React from 'react';
import cn from 'classnames';
import { useSwipeableButton } from '@/hooks';
import styles from '@/styles/SwipeableButton.module.css';
import styled from '@emotion/styled';

const SwipeableButton = () => {
  const { buttons, buttonsChildren, buttonsAction, isShow, isDefault } = useSwipeableButton();
  return (
    <StyledButton className={cn(styles.container, styles['but' + isShow])} isCustom={!isDefault}>
      {buttons.map(({ type }, index) => {
        return (
          <button
            className={cn(styles.button, index === 0 ? styles[`${isShow}`] : '')}
            key={`swipablebutton-${index}`}
            onClick={buttonsAction(type)}
          >
            {buttonsChildren(type)}
          </button>
        );
      })}
    </StyledButton>
  );
};

export default React.memo(SwipeableButton);

const StyledButton = styled.div<{ isCustom: boolean }>`
  transform: ${({ isCustom }) => (isCustom ? 'translateY(calc(var(--drawer-list-height) * 2))' : '')};
  transition: transform 0.5s ease-in-out;
`;
