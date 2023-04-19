import React from 'react';
import { useInput, useSearch } from '@/hooks';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';

type Props = {
  location: { lat: number; lng: number };
};

const Search = ({ location }: Props) => {
  const { value, reset, handleChange } = useInput('');
  const { searchResult } = useSearch(value, location.lat, location.lng);
  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      {/* <SearchResultBox value={value} searchResult={searchResult} reset={reset} /> */}
    </>
  );
};

export default Search;
