import React, { useContext } from 'react';
import { useInput, useSelectedButton, useCreateTeam, useQuery } from '@/hooks';
import { Input, FlexColumn, ProgressButton, ButtonGroup, TypoNotoSans, SwipeableEdgeDrawer } from '@/layouts';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';
import { SelectsContext } from '@/components/context';

type Props = {
  isLoading: boolean;
  addressName: string;
  location: {
    lat: number;
    lng: number;
  };
};

const TeamSettingDrawer = ({ isLoading, addressName, location }: Props) => {
  const { selects } = useContext(SelectsContext);
  const { value: name, isError: isNameError, handleChange: handleNameChange } = useInput('');
  const { value: count, isError: isCountError, handleChange: handleCountChange } = useInput(7);
  const { isDefault } = useQuery();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();
  const { isLoaded, onClick } = useCreateTeam(name, count, location.lat, location.lng, radius);

  return (
    <SwipeableEdgeDrawer>
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
          <DefaultListItem className={styles.list_item} isCustom={isDefault} type='custom' noBorder={true}>
            <TypoNotoSans text='선택 식당수' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <TypoNotoSans text={selects.length} className={styles.list_item__content} textAlign='center' />
            </div>
          </DefaultListItem>
          <EmptyListItem className={styles.list_item} isCustom={false} />
        </StyledUl>
        <ProgressButton
          isLoaded={isLoaded}
          onClick={onClick}
          disabled={
            isLoading || name === '' || (isDefault && isCountError.state) || isNameError.state || (!isDefault && selectsLength === 0)
          }
          {...doneButtonStyle}
        >
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </ProgressButton>
      </FlexColumn>
    </SwipeableEdgeDrawer>
  );
};

export default TeamSettingDrawer;

const StyledUl = styled.ul`
  list-style: none;
`;

const DefaultListItem = styled.li<{ isCustom: boolean; type: string; noBorder?: boolean }>`
  opacity: ${({ isCustom, type }) => (isCustom && type === 'custom' ? 0 : 1)};
  height: ${({ isCustom, type }) => (isCustom && type === 'custom' ? 0 : `var(--drawer-list-height)`)};
  border-bottom: ${({ isCustom, type, noBorder }) => ((isCustom && type === 'custom') || noBorder ? 0 : '1px solid #eee')};
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
  sx: { color: 'white', height: 'var(--drawer-button-height)' },
};
