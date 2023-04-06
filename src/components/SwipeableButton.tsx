import React from 'react';
import styles from '@/styles/SwipeableButton.module.css';
import TypoNotoSans from './TypoNotoSans';
import { FlexRow } from '@/layouts';

type Props = {
  buttons: {
    label: string;
    onClick: () => void;
  }[];
};

const SwipeableButton = ({ buttons }: Props) => {
  return (
    <div className={styles.container}>
      {buttons.map(({ label, onClick }, index) => {
        return (
          <button className={styles.button} key={`swipablebutton-${label}-${index}`} onClick={onClick}>
            <TypoNotoSans text={label} variant='caption' fontSize={label.length === 1 ? '0.85rem' : '0.75rem'} textAlign='center' />
          </button>
        );
      })}
    </div>
  );
};

export default SwipeableButton;
