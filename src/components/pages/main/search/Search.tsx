import React from 'react';
import { useInput, useSearch } from '@/hooks';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import type { SelectPlace } from '@/interfaces';

type Props = {
  location: { lat: number; lng: number };
  addSelects: (newSelect: SelectPlace) => void;
};

const Search = ({ location, addSelects }: Props) => {
  const { value, reset, handleChange } = useInput('');
  const { searchResult } = useSearch(value, location.lat, location.lng);
  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResult value={value} searchResult={searchResult} reset={reset} />
    </>
  );
};

export default Search;
