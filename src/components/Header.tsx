import React from 'react';
import Link from 'next/link';
import { Snackbar, IconButton } from '@mui/material';
import { TypoNotoSans } from '@/layouts';
import { useAlert, useCopy } from '@/hooks';
import { HomeIcon, InviteIcon } from '@/icons';
import styles from '@/styles/Header.module.css';
interface Props {
  showButtons?: boolean;
}

const Header = ({ showButtons = true }: Props) => {
  const { invite } = useCopy();
  const { Alert, open, handleOpen, handleClose } = useAlert();

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
        <IconButton>
          <InviteIcon />
        </IconButton>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          초대 링크가 복사되었습니다!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
