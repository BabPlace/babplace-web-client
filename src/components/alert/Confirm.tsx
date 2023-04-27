import React, { useState } from 'react';
import { Visible, FlexColumn, FlexRow, TypoNotoSans } from '@/layouts';
import styles from '@/styles/Confirm.module.css';
import { Backdrop } from '@mui/material';

type Props = {
  isShow: boolean;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
};
const Confirm = ({ isShow, message, handleClose, handleConfirm }: Props) => {
  return (
    <>
      <Backdrop open={isShow} onClick={handleClose} sx={{ zIndex: 1 }} />
      <Visible visible={isShow} className={styles.container}>
        <div className={styles.fc}>
          <FlexColumn alignItems='center' justifyContent='center' className={styles.title}>
            <TypoNotoSans text={message} className={styles.center} component='span' />
          </FlexColumn>
          <FlexRow className={styles.buttons}>
            <FlexColumn alignItems='center' justifyContent='center' className={styles.button} onClick={handleClose}>
              <TypoNotoSans text='취소' className={styles.center} component='span' color='error' />
            </FlexColumn>
            <FlexColumn alignItems='center' justifyContent='center' className={styles.button} onClick={handleConfirm}>
              <TypoNotoSans text='확인' className={styles.center} component='span' color='primary.dark' />
            </FlexColumn>
          </FlexRow>
        </div>
      </Visible>
    </>
  );
};

export default Confirm;
