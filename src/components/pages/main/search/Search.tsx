import React from 'react';
import { useInput, useSearch, useSearchResultDrawerButtons, useSelectedSearchResult } from '@/hooks';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';
import SearchResultDrawer from './SearchResultDrawer';
import { AlertSnackBar } from '@/components';
import type { SetLocation } from '@/hooks/useMainMap';

type Props = {
  location: { lat: number; lng: number };
  setLocation: SetLocation;
};

const Search = ({ location, setLocation }: Props) => {
  const { value, reset, handleChange } = useInput('');
  const { searchResults } = useSearch(value, location);
  const { selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult } = useSelectedSearchResult(setLocation);
  const { open, clear, add, share, handleClose } = useSearchResultDrawerButtons(selectedSearchResult, reset, clearSelectedSearchResult);

  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResultBox value={value} searchResult={searchResults} handleClickResult={handleClickSearchResult} />
      <SearchResultDrawer add={add} clear={clear} share={share} selectedSearchResult={selectedSearchResult} />
      <AlertSnackBar open={open} handleClose={handleClose} message='클립보드에 복사되었습니다' severity='info' />
    </>
  );
};

export default Search;
