import React, { ReactNode } from 'react';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  style?: React.CSSProperties;
};

const Layout = ({ children, title = 'This is the default title', description = 'This is default description' }: Props) => (
  <div className={styles.main}>
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className={styles.max_width}> {children}</div>
  </div>
);

export default Layout;
