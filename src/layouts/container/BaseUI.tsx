import React, { ReactNode } from 'react';
import Head from 'next/head';

import styles from '@/styles/BaseUI.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  bodyStyle?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseUI = ({ children, bodyStyle, title = '밥풀레이스 🍚', description = 'This is default description', ...props }: Props) => {
  return (
    <div className={styles.main} {...props}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default BaseUI;
