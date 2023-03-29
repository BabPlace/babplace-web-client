import React from 'react';
import styles from '@/styles/ButtonGroup.module.css';

type Props = {
  children: React.ReactNode[];
} & React.HTMLAttributes<HTMLDivElement>;

const ButtonGroup = ({ children, ...props }: Props) => {
  return (
    <div className={styles.container} {...props}>
      {children.map((child, index) => {
        return (
          <div key={index} className={styles.item}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
