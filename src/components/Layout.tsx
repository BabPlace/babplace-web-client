import React, { ReactNode } from 'react';
import Head from 'next/head';

import styles from '@/styles/Home.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  bodyStyle?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const Layout = ({ children, bodyStyle, title = '골라밥 🍚', description = 'This is default description', ...props }: Props) => {
  return (
    <div className={styles.main} {...props}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
