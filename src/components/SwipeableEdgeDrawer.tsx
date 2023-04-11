import React from 'react';
import { useInput, useDrawer, useSelectedButton, useCreateTeam } from '@/hooks';
import { ProgressButton } from '@/layouts';
import TypoNotoSans from './TypoNotoSans';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  addressName: string;
  lat: number;
  lng: number;
};

const SwipeableEdgeDrawer = ({ addressName, lat, lng }: Props) => {
  const { value: name, isError: isNameError, handleChange: handleNameChange } = useInput('');
  const { value: count, isError: isCountError, handleChange: handleCountChange } = useInput(10);
  const { drawerRef, open } = useDrawer();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();
  const { isLoaded, onClick } = useCreateTeam(name, count, lat, lng, radius);

  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.puller} />
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <TypoNotoSans text='팀 이름' {...liTitleOptions} />
            <Input
              value={name}
              className={styles.list_item__content}
              placeholder='팀명을 입력하세요'
              error={isNameError.state}
              errorText={isNameError.message}
              errorSize='small'
              border={false}
              onChange={handleNameChange}
            />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='기준 위치' {...liTitleOptions} />
            <TypoNotoSans text={addressName} className={styles.list_item__content} fontSize='0.8rem' textAlign='center' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='음식점 개수' {...liTitleOptions} />
            <Input
              value={count}
              className={styles.list_item__content}
              type='number'
              error={isCountError.state}
              errorText={isCountError.message}
              errorSize='small'
              border={false}
              onChange={handleCountChange}
            />
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
        <ProgressButton
          isLoaded={isLoaded}
          onClick={onClick}
          disabled={name === '' || isCountError.state || isNameError.state}
          {...doneButtonStyle}
        >
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </ProgressButton>
      </div>
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? 'var(--drawer-maximun-height)' : 'var(--drawer-default-height)')};
  /* z-index: ${(props) => (props.isOpen ? 4000 : 3000)}; */
  /* z-index: 1; */
`;

const liTitleOptions = {
  className: styles.list_item__title,
  textAlign: 'right' as const,
  fontWeight: 500,
};

const doneButtonStyle = {
  variant: 'contained' as const,
  fullWidth: true,
  sx: { color: 'white' },
};
