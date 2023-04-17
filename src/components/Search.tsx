import React from 'react';
import Input from './Input';
import { useInput, useSearch, useQuery } from '@/hooks';
import { IconButton } from '@mui/material';
import { MapIcon, SearchIcon } from '@/icons';
import { FlexColumn, Visible } from '@/layouts';
import styles from '@/styles/Search.module.css';

type Props = {
  location: { lat: number; lng: number };
};

const Search = ({ location }: Props) => {
  const { value, handleChange } = useInput('');
  const { searchResult } = useSearch(value, location.lat, location.lng);
  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResult searchResult={searchResult} />
    </>
  );
};

export default Search;

const SearchBox = ({ value, handleChange }: { value: string; handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const { isDefault, isCustom, isSearch, setQuery } = useQuery();
  return (
    <Visible visible={!isDefault} className={styles.search_box}>
      <IconButton
        onClick={() => {
          setQuery('mode', isCustom ? 'search' : 'custom');
        }}
      >
        {isCustom ? <SearchIcon /> : <MapIcon />}
      </IconButton>
      <Input
        value={value}
        placeholder='장소 주소 식당 검색'
        border={false}
        onChange={handleChange}
        onClick={() => {
          setQuery('mode', 'search');
        }}
        textAlign='left'
        className={styles.search_box__input}
      />
    </Visible>
  );
};

const SearchResult = ({ searchResult }: { searchResult: kakao.maps.services.PlacesSearchResult }) => {
  const { isSearch } = useQuery();
  return (
    <Visible visible={isSearch} className={styles.search_result}>
      <FlexColumn className={styles.search_result__content}>
        {searchResult.map((item) => (
          <div>{item.place_name}</div>
        ))}
      </FlexColumn>
    </Visible>
  );
};
