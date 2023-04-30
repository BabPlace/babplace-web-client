import React from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { AlertSnackBar } from '../snackbar';
import { LogoTr } from '../logo';
import { FlexRow, TypoNotoSans } from '@/layouts';
import { useAlert, useCopy } from '@/hooks';
import { HomeIcon, InviteIcon } from '@/icons';
import styles from '@/styles/Header.module.css';
interface Props {
  showButtons?: boolean;
}

const Header = ({ showButtons = true }: Props) => {
  const { invite } = useCopy();
  const { open, handleOpen, handleClose } = useAlert();

  const handleClick = () => {
    handleOpen();
    invite();
  };

  return (
    <div className={styles.header__container}>
      {showButtons && (
        <Link href='/'>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
      )}

      <FlexRow height='100%' alignItems='center'>
        <LogoTr height='40px' />
        <TypoNotoSans variant='h6' textAlign='center' width='100%' fontSize='20px'>
          밥풀레이스
        </TypoNotoSans>
      </FlexRow>
      {showButtons && (
        <IconButton onClick={handleClick}>
          <InviteIcon />
        </IconButton>
      )}
      <AlertSnackBar open={open} handleClose={handleClose} message='초대 링크가 복사되었습니다!' severity='info' />
    </div>
  );
};

export default Header;
