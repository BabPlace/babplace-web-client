import React from 'react';
import Link from 'next/link';
import TypoNotoSans from './TypoNotoSans';
import { Snackbar } from '@mui/material';
import PointerIconButton from './PointerIconButton';
import { useAlert } from '@/hooks';
import styles from '@/styles/Header.module.css';

interface Props {
  showButtons?: boolean;
}

const Header = ({ showButtons = true }: Props) => {
  const { Alert, open, handleOpen, handleClose } = useAlert();

  function copyLink() {
    handleOpen();
    navigator.clipboard.writeText(window.location.href);
  }
  return (
    <div className={styles.header__container}>
      {showButtons && (
        <Link href='/'>
          <PointerIconButton icon='home' aria-label='home' />
        </Link>
      )}
      <TypoNotoSans text='🍚 골라밥 🍚' variant='h6' textAlign='center' width='100%' fontSize='20px' />
      {showButtons && <PointerIconButton icon='invite' aria-label='invite' onClick={copyLink} />}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          초대 링크가 복사되었습니다!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
