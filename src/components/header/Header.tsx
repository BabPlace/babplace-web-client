import React from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import { AlertSnackBar } from '../snackbar';
import { TypoNotoSans } from '@/layouts';
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
      <TypoNotoSans text='🍚 골라밥 🍚' variant='h6' textAlign='center' width='100%' fontSize='20px' />
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
