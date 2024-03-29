import React from 'react';
import { useInput, useQuery, useSearch, useSearchResultDrawerButtons, useSelectedSearchResult } from '@/hooks';
import { AlertSnackBar } from '@/components';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';
import SearchResultDrawer from './SearchResultDrawer';

const Search = () => {
  const { isSearch, toggleSearch, setQuery } = useQuery();
  const { value, reset, handleChange, setForceValue } = useInput('');
  const { searchResults } = useSearch(value);
  const { selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult } = useSelectedSearchResult();
  const { open, clear, add, share, handleClose } = useSearchResultDrawerButtons(selectedSearchResult, reset, clearSelectedSearchResult);

  return (
    <>
      <SearchResultDrawer add={add} clear={clear} share={share} selectedSearchResult={selectedSearchResult} setForceValue={setForceValue} />
      <SearchBox
        value={value}
        handleChange={handleChange}
        placeholder='장소 주소 식당 검색'
        handleClose={() => {
          setQuery('search');
        }}
        reset={reset}
        isSearch={isSearch}
        handleClick={() => {
          setQuery('search', 'true');
        }}
      />
      <SearchResultBox
        value={value}
        searchResult={searchResults}
        handleClickResult={handleClickSearchResult}
        setForceValue={setForceValue}
      />
      <AlertSnackBar open={open} handleClose={handleClose} message='클립보드에 복사되었습니다' severity='info' />
    </>
  );
};

export default Search;
