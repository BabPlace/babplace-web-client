import React from 'react';
import { useInput, useDrawer, useSelectedButton, useCreateTeam, useQuery } from '@/hooks';
import { FlexColumn, FlexRow, ProgressButton, TypoNotoSans } from '@/layouts';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  isLoading: boolean;
  addressName: string;
  location: {
    lat: number;
    lng: number;
  };
};

const SwipeableEdgeDrawer = ({ isLoading, addressName, location }: Props) => {
  const { value: name, isError: isNameError, handleChange: handleNameChange } = useInput('');
  const { value: count, isError: isCountError, handleChange: handleCountChange } = useInput(7);
  const { drawerRef, open } = useDrawer();
  const { isDefault } = useQuery();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();
  const { isLoaded, onClick } = useCreateTeam(name, count, location.lat, location.lng, radius);

  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.puller} />
      <FlexColumn className={styles.content} justifyContent='space-between'>
        <StyledUl>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='default'>
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
          </DefaultListItem>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='custom'>
            <TypoNotoSans text='기준 위치' {...liTitleOptions} />
            <TypoNotoSans text={addressName} className={styles.list_item__content} fontSize='0.8rem' textAlign='center' />
          </DefaultListItem>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='custom'>
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
          </DefaultListItem>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='custom' noBorder={true}>
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
          </DefaultListItem>
          <EmptyListItem className={styles.list_item} isCustom={!isDefault} />
          <CustomListItem className={styles.list_item} isCustom={!isDefault} type='custom'>
            <FlexRow className={styles.custon__buttons} alignItems='center' gap='10px'>
              <button className={styles.custon__buttons_add}>+</button>
              <div>res</div>
            </FlexRow>
          </CustomListItem>
        </StyledUl>
        <ProgressButton
          isLoaded={isLoaded}
          onClick={onClick}
          disabled={isLoading || name === '' || isCountError.state || isNameError.state}
          {...doneButtonStyle}
        >
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </ProgressButton>
      </FlexColumn>
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean; isCustom?: boolean }>`
  /* height: ${({ isOpen, isCustom }) => (isCustom ? '' : isOpen ? 'var(--drawer-maximun-height)' : 'var(--drawer-default-height)')}; */
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const DefaultListItem = styled.li<{ isCustom: boolean; type: string; noBorder?: boolean }>`
  opacity: ${({ isCustom, type }) => (isCustom && type === 'custom' ? 0 : 1)};
  height: ${({ isCustom, type }) => (isCustom && type === 'custom' ? 0 : `var(--drawer-list-height)`)};
  border-bottom: ${({ isCustom, type, noBorder }) => ((isCustom && type === 'custom') || noBorder ? 0 : '1px solid #eee')};
`;
const CustomListItem = styled.li<{ isCustom: boolean; type: string }>`
  opacity: ${({ isCustom, type }) => (isCustom && type === 'custom' ? 1 : 0)};
  height: ${({ isCustom, type }) => (isCustom && type === 'custom' ? `calc(var(--drawer-list-height) * 2)` : 0)};
  border-bottom: 0;
`;
const EmptyListItem = styled.li<{ isCustom: boolean }>`
  height: ${({ isCustom }) => (isCustom ? 0 : `var(--drawer-list-button-gap)`)};
  border-bottom: 0;
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
