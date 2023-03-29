import React from 'react';
import { Button } from '@mui/material';
import { useInput, useDrawer } from '@/hooks';
import TypoNotoSans from './TypoNotoSans';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import styles from '@/styles/Drawer.module.css';
import styled from '@emotion/styled';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';

const SwipeableEdgeDrawer = () => {
  const { drawerRef, open, onFocus } = useDrawer();
  const liTitleOptions = {
    className: styles.list_item__title,
    textAlign: 'right' as const,
    fontSize: '0.9rem',
  };

  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <TypoNotoSans text='팀명' {...liTitleOptions} />
            <Input className={styles.list_item__content} onFocus={onFocus} placeholder='팀 이름' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='기준 위치' {...liTitleOptions} />
            <Input className={styles.list_item__content} onFocus={onFocus} placeholder='위치' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='음식점 개수' {...liTitleOptions} />
            <Input className={styles.list_item__content} onFocus={onFocus} placeholder='15' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='제한 반경' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <ButtonGroup>
                <FootPrintIcon />
                <BikeIcon />
                <BusIcon />
              </ButtonGroup>
              <TypoNotoSans className={styles.list_item__button_guide} variant='caption'>
                guide
              </TypoNotoSans>
            </div>
          </li>
        </ul>
        <Button variant='contained' fullWidth style={{ height: 'var(--drawer-button-height)' }}>
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </Button>
      </div>
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? 'var(--drawer-maximun-height)' : 'var(--drawer-default-height)')};
`;
