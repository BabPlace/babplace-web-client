import React from 'react';
import styles from '@/styles/ResultCard.module.css';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  title?: string;
  index?: number;
}

const ResultCard = ({ children, title, index }: Props) => {
  const theme = useTheme();
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
    <ColoredBox className={styles.result_card__container} bgColor={theme.myPalette[theme.palette.mode].boxBackground}>
      {title && (
        <Typography textAlign='center' variant='h6' fontSize='1rem' marginBottom='10px'>
          {getMedal(index) + title}
        </Typography>
      )}
      {children}
    </ColoredBox>
  );
};

export default ResultCard;

const ColoredBox = styled.div<{ bgColor?: string; fgColor?: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fgColor};
`;
