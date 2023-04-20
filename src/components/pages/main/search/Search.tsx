import React from 'react';
import { useInput, useSearch, useQuery } from '@/hooks';
import { SwipeableEdgeDrawer } from '@/layouts';
import { Button } from '@mui/material';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';

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
      <SwipeableEdgeDrawer
        isHidden={!isCustom || selectedSearchResult === null}
        height={
          'calc(var(--drawer-list-height) * 2 + var(--drawer-list-button-gap) + var(--drawer-button-height) + var(--drawer-inner-padding-tb)) '
        }
      >
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
