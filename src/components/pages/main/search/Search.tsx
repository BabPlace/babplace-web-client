import React from 'react';
import { useInput, useSearch, useQuery } from '@/hooks';
import { SwipeableEdgeDrawer } from '@/layouts';
import { Button } from '@mui/material';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';

type Props = {
  location: { lat: number; lng: number };
};

const Search = ({ location }: Props) => {
  const { isCustom } = useQuery();
  const { value, reset, handleChange } = useInput('');
  const { searchResults, selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult } = useSearch(
    value,
    location.lat,
    location.lng
  );
  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResultBox value={value} searchResult={searchResults} handleClickResult={handleClickSearchResult} />
      <SwipeableEdgeDrawer isHidden={!isCustom || selectedSearchResult === null}>
        <div>hi</div>
        <Button
          onClick={() => {
            reset();
            clearSelectedSearchResult();
          }}
        >
          done
        </Button>
      </SwipeableEdgeDrawer>
    </>
  );
};

export default Search;
