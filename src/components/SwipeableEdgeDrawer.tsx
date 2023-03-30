import React from 'react';
import { useRouter } from 'next/router';
import { useInput, useDrawer, useSelectedButton } from '@/hooks';
import { GButton } from '@/layouts';
import TypoNotoSans from './TypoNotoSans';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import { createTeam } from '@/controller';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';
import styles from '@/styles/Drawer.module.css';
import styled from '@emotion/styled';

type Props = {
  addressName: string;
  lat: number;
  lng: number;
};

const SwipeableEdgeDrawer = ({ addressName, lat, lng }: Props) => {
  const router = useRouter();
  const { value: name, handleChange } = useInput('');
  const { drawerRef, open, onFocus } = useDrawer();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();

  const liTitleOptions = {
    className: styles.list_item__title,
    textAlign: 'right' as const,
    fontSize: '0.9rem',
    fontWeight: 500,
  };

  const onClick = () => {
    createTeam({ name, lat, lng, radius }).then(({ teamId }) => {
      router.push({
        pathname: `gola/${teamId}`,
      });
    });
  };

  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.puller} />
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <TypoNotoSans text='팀명' {...liTitleOptions} />
            <Input
              className={styles.list_item__content}
              onFocus={onFocus}
              placeholder='팀명을 입력하세요'
              value={name}
              onChange={handleChange}
            />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='기준 위치' {...liTitleOptions} />
            <TypoNotoSans text={addressName} className={styles.list_item__content} fontSize='0.9rem' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='음식점 개수' {...liTitleOptions} />
            <TypoNotoSans text='15' className={styles.list_item__content} fontSize='0.9rem' textAlign='center' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='제한 반경' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <ButtonGroup selectedButton={selectedButton} onClickButton={onClickButton}>
                <FootPrintIcon />
                <BikeIcon />
                <BusIcon />
              </ButtonGroup>
              <TypoNotoSans className={styles.list_item__button_guide} variant='caption' textAlign='center' fontSize='0.6rem'>
                {guideMessage}
              </TypoNotoSans>
            </div>
          </li>
        </ul>
        <GButton onClick={onClick} disabled={name === ''}>
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </GButton>
      </div>
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? 'var(--drawer-maximun-height)' : 'var(--drawer-default-height)')};
`;
