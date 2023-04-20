import React, { useEffect } from 'react';
import { useInput, useSearch, useQuery } from '@/hooks';
import { FlexColumn, FlexRow, SwipeableEdgeDrawer, TypoNotoSans } from '@/layouts';
import { Button, IconButton, styled } from '@mui/material';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';
import { AlertSnackBar } from '@/components';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';

import { CloseIcon, IosShareIcon } from '@/icons';

type Props = {
  location: { lat: number; lng: number };
};

const Search = ({ location }: Props) => {
  const { isCustom } = useQuery();
  const { value, reset, handleChange } = useInput('');
  const { searchResults, selectedSearchResult, open, handleClose, share, handleClickSearchResult, clearSelectedSearchResult } = useSearch(
    value,
    location.lat,
    location.lng
  );

  const clear = () => {
    reset();
    clearSelectedSearchResult();
  };

  useEffect(() => {
    if (isCustom) {
      clear();
    }
  }, [isCustom]);

  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResultBox value={value} searchResult={searchResults} handleClickResult={handleClickSearchResult} />
      <SwipeableEdgeDrawer isHidden={!isCustom || selectedSearchResult === null} height={drawerHeight}>
        {/* <SwipeableEdgeDrawer isHidden={false} height={drawerHeight}> */}
        <FlexColumn justifyContent='space-between' height='100%'>
          <FlexRow width='100%' justifyContent='space-between' alignItems='top'>
            <TypoNotoSans text='hi' />
            <FlexRow gap='7px' alignItems='top'>
              <RoundedIconButton size='small' onClick={share}>
                <IosShareIcon fontSize='small' sx={{ width: '17px', height: '17px' }} />
              </RoundedIconButton>
              <RoundedIconButton size='small' onClick={clear}>
                <CloseIcon fontSize='small' sx={{ width: '17px', height: '17px' }} />
              </RoundedIconButton>
            </FlexRow>
          </FlexRow>
          <Button onClick={clear} {...doneButtonStyle}>
            <TypoNotoSans text='추가하기' variant='button' textAlign='center' color='primary' />
          </Button>
        </FlexColumn>
      </SwipeableEdgeDrawer>
      <AlertSnackBar open={open} handleClose={handleClose} message='클립보드에 복사되었습니다' severity='info' />
    </>
  );
};

export default Search;

const drawerHeight =
  'calc(var(--drawer-list-height) * 2 + var(--drawer-list-button-gap) + var(--drawer-button-height) + var(--drawer-inner-padding-tb))';
const doneButtonStyle = {
  variant: 'contained' as const,
  fullWidth: true,
  sx: { height: 'var(--drawer-button-height)', backgroundColor: 'rgb(var(--tertiary-background-rgb))' },
};
const RoundedIconButton = styled(IconButton)`
  && {
    border-radius: 50%;
    background: rgb(var(--tertiary-background-rgb));
    color: rgb(var(--tertiary-foreground-rgb));
  }
`;
