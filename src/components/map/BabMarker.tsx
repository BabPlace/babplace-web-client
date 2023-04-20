import React from 'react';
import cn from 'classnames';
import styles from '@/styles/BabMarker.module.css';

type Props = {
  isCustom: boolean;
};

const BabMarker = ({ isCustom }: Props) => {
  return <div className={cn(styles.container, isCustom && styles.custom)} />;
};

export default BabMarker;
