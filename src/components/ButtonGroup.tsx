import React from 'react';
import styles from '@/styles/ButtonGroup.module.css';
import cn from 'classnames';

type Props = {
  selectedButton: number;
  onClickButton: (button: number) => void;
  children: React.ReactNode[];
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonGroup = ({ selectedButton, onClickButton, children, ...props }: Props) => {
  return (
    <div className={styles.container} {...props}>
      {children.map((child, index) => {
        return (
          <div
            key={index}
            className={cn(styles.item, { [styles.selected]: selectedButton === index })}
            onClick={() => onClickButton(index)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
