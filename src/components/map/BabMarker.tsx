import React from 'react';
import cn from 'classnames';
import styles from '@/styles/BabMarker.module.css';

type Props = {
  isCustom: boolean;
};

const BabMarker = ({ isCustom }: Props) => {
  return <img src='icons/icon-tr-512x512.png' className={cn(styles.container, isCustom && styles.custom)} />;
};

export default React.memo(BabMarker);
