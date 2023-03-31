import React from 'react';
import { TypoNotoSans } from '@/components';
import styles from '@/styles/ResultCard.module.css';

type Props = {
  children?: React.ReactNode;
  title?: string;
  index?: number;
};

const ResultCard = ({ children, title, index }: Props) => {
  function getMedal(index?: number) {
    if (index === undefined) return '';
    if (index === 0) {
      return '🥇 ';
    } else if (index === 1) {
      return '🥈 ';
    }
    return '🥉 ';
  }
  return (
    <div className={styles.result_card__container}>
      {title && <TypoNotoSans text={getMedal(index) + title} {...titleStyle} />}
      {children}
    </div>
  );
};

export default ResultCard;

const titleStyle = {
  fontSize: '1rem',
  textAlign: 'center' as const,
  marginBottom: '16px',
};
