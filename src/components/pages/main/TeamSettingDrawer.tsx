import React, { useContext } from 'react';
import { useInput, useSelectedButton, useCreateTeam, useQuery } from '@/hooks';
import { Input, FlexColumn, ProgressButton, ButtonGroup, TypoNotoSans, SwipeableEdgeDrawer, FlexRow, Visible } from '@/layouts';
import { BusIcon, BikeIcon, FootPrintIcon, FormatListIcon, AddRoundedIcon, RemoveRoundedIcon } from '@/icons';
import { SelectsContext } from '@/context';
import { IconButton } from '@mui/material';
import Recommends from './Recommends';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  isLoading: boolean;
};

const TeamSettingDrawer = ({ isLoading }: Props) => {
  const { selects, show } = useContext(SelectsContext);
  const { value: name, isError: isNameError, handleChange: handleNameChange } = useInput('');
  const { value: count, isError: isCountError, handleChange: handleCountChange, setForceValue: setCountForceValue } = useInput(7);
  const {
    value: userCount,
    isError: isUserCountError,
    handleChange: handleUserCountChange,
    setForceValue: setUserCountForceValue,
  } = useInput(5);
  const { isDefault, drawer } = useQuery();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();
  const { isLoaded, createTeam } = useCreateTeam(name, count, radius, userCount);

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
            <TypoNotoSans text='참여 인원' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <FlexRow style={{ margin: '0 calc((100% - var(--drawer-list-height) * 0.75 * 3) / 4)' }}>
                <IconButton
                  onClick={() => {
                    setUserCountForceValue(parseInt(userCount.toString()) - 1);
                  }}
                >
                  <RemoveRoundedIcon />
                </IconButton>
                <Input
                  width='50px'
                  value={userCount}
                  type='number'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  error={isUserCountError.state}
                  errorText={isUserCountError.message}
                  errorSize='small'
                  border={false}
                  onChange={handleUserCountChange}
                />
                <IconButton
                  onClick={() => {
                    setUserCountForceValue(parseInt(userCount.toString()) + 1);
                  }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </FlexRow>
            </div>
          </DefaultListItem>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='custom'>
            <TypoNotoSans text='음식점 개수' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <FlexRow style={{ margin: '0 calc((100% - var(--drawer-list-height) * 0.75 * 3) / 4)' }}>
                <IconButton
                  onClick={() => {
                    setCountForceValue(parseInt(count.toString()) - 1);
                  }}
                >
                  <RemoveRoundedIcon />
                </IconButton>
                <Input
                  width='50px'
                  value={count}
                  type='number'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  error={isCountError.state}
                  errorText={isCountError.message}
                  errorSize='small'
                  border={false}
                  onChange={handleCountChange}
                />
                <IconButton
                  onClick={() => {
                    setCountForceValue(parseInt(count.toString()) + 1);
                  }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </FlexRow>
            </div>
          </DefaultListItem>
          <DefaultListItem className={styles.list_item} isCustom={!isDefault} type='custom' noBorder={true} style={{ overflow: 'visible' }}>
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
              <FlexRow alignItems='center'>
                <TypoNotoSans text={selects.length} className={styles.list_item__content} textAlign='center' />
                <IconButton onClick={show} size='small' sx={{ position: 'absolute', right: '0' }}>
                  <FormatListIcon />
                </IconButton>
              </FlexRow>
            </div>
          </DefaultListItem>
          <EmptyListItem className={styles.list_item} isCustom={false} />
        </StyledUl>
        <ProgressButton
          isLoaded={isLoaded}
          onClick={createTeam}
          disabled={
            isLoading || name === '' || (isDefault && isCountError.state) || isNameError.state || (!isDefault && selects.length === 0)
          }
          {...doneButtonStyle}
        >
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </ProgressButton>
        <Recommends />
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
