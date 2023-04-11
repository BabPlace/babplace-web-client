import React from 'react';
import cn from 'classnames';
import { useSwipeableButton } from '@/hooks';
import styles from '@/styles/SwipeableButton.module.css';

const SwipeableButton = () => {
  const { buttons, isShow } = useSwipeableButton();
  return (
    <div className={cn(styles.container, styles['but' + isShow])}>
      {buttons.map(({ children, onClick, className }, index) => {
        return (
          <button className={cn(styles.button, className ? styles[`${className}`] : '')} key={`swipablebutton-${index}`} onClick={onClick}>
            {children}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(SwipeableButton);
