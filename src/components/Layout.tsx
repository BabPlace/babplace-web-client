import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import styles from '@/styles/Home.module.css';

type Props = {
  children?: ReactNode;
  title?: string;
  description: string;
  style?: React.CSSProperties;
};

const Layout = ({ children, style, title = '골라밥 🍚', description = 'This is default description' }: Props) => {
  const theme = useTheme();
  return (
    <div className={styles.main}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StyledDiv
        style={style}
        bgColor={theme.myPalette[theme.palette.mode].background}
        fgColor={theme.myPalette[theme.palette.mode].foreground}
      >
        {children}
      </StyledDiv>
    </div>
  );
};

export default Layout;

const StyledDiv = styled.div<{ bgColor: string; fgColor: string }>`
  position: relative;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fgColor};
  width: 100%;
  margin-top: var(--header-default-height);
  height: calc(100vh - var(--header-default-height));
`;
