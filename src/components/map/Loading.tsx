import React from 'react';
import styles from '@/styles/Loading.module.css';

type Props = React.CSSProperties;

const Loading = (props: Props) => {
  return (
    <div className={styles.container} style={props}>
      <div className={styles.logo}>🍚</div>
    </div>
  );
};

export default Loading;
