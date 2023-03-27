import React from 'react';
import Link from 'next/link';
import TypoNotoSans from './TypoNotoSans';
import { IconButton, Snackbar } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTheme } from '@mui/material/styles';
import { useAlert } from '@/hooks';
import styled from '@emotion/styled';
import styles from '@/styles/Header.module.css';

interface Props {
  showButtons?: boolean;
}

const Header = ({ showButtons = true }: Props) => {
  const theme = useTheme();
  const { Alert, open, handleOpen, handleClose } = useAlert();

  function copyLink() {
    handleOpen();
    navigator.clipboard.writeText(window.location.href);
  }
  return (
    <StyledDiv
      className={styles.header__container}
      bgColor={theme.myPalette[theme.palette.mode].background}
      fgColor={theme.myPalette[theme.palette.mode].foreground}
    >
      {showButtons && (
        <Link href='/'>
          <IconButton aria-label='home' style={{ cursor: 'pointer' }}>
            <HomeOutlinedIcon />
          </IconButton>
        </Link>
      )}
      <TypoNotoSans variant='h6' textAlign='center' width='100%'>
        🍚 골라밥 🍚
      </TypoNotoSans>
      {showButtons && (
        <IconButton aria-label='invite' style={{ cursor: 'pointer' }} onClick={copyLink}>
          <PersonAddAltIcon />
        </IconButton>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          초대 링크가 복사되었습니다!
        </Alert>
      </Snackbar>
    </StyledDiv>
  );
};

export default Header;

const StyledDiv = styled.div<{ bgColor: string; fgColor: string }>`
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 0 10px 0 ${(props) => props.fgColor + '20'};
`;
