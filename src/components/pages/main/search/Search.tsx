import React, { useCallback, useEffect } from 'react';
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
  addSelects: (newSelect: kakao.maps.services.PlacesSearchResultItem) => void;
  setLocation: ({ latitude, longitude }: { latitude?: number | undefined; longitude?: number | undefined }) => void;
};

const Search = ({ location, addSelects, setLocation }: Props) => {
  const { isCustom } = useQuery();
  const { value, reset, handleChange } = useInput('');
  const { searchResults, selectedSearchResult, open, handleClose, share, handleClickSearchResult, clearSelectedSearchResult } = useSearch(
    value,
    location.lat,
    location.lng,
    setLocation
  );

  const clear = () => {
    reset();
    clearSelectedSearchResult();
  };

  const add = useCallback(() => {
    clear();
    if (!selectedSearchResult) return;
    addSelects(selectedSearchResult);
  }, [selectedSearchResult]);

  useEffect(() => {
    if (isCustom) {
      clear();
    }
  }, [isCustom]);

  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResultBox value={value} searchResult={searchResults} handleClickResult={handleClickSearchResult} />
      {/* <SwipeableEdgeDrawer isHidden={!isCustom || selectedSearchResult === null} height={drawerHeight}> */}
      <SwipeableEdgeDrawer isHidden={false} height={drawerHeight}>
        <FlexColumn justifyContent='space-between' height='100%'>
          <FlexRow width='100%' justifyContent='space-between' alignItems='flex-start'>
            <TypoNotoSans text={selectedSearchResult?.place_name} variant='h5' />
            <FlexRow gap='7px' alignItems='flex-start'>
              <RoundedIconButton size='small' onClick={share}>
                <IosShareIcon {...iconStyle} />
              </RoundedIconButton>
              <RoundedIconButton size='small' onClick={clear}>
                <CloseIcon {...iconStyle} />
              </RoundedIconButton>
            </FlexRow>
          </FlexRow>
          <Button onClick={add} {...doneButtonStyle}>
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
const iconStyle = {
  fontSize: 'small' as const,
  sx: { width: '17px', height: '17px' },
};
