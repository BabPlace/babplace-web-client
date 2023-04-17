import React from 'react';
import Input from './Input';
import { useInput, useSearch } from '@/hooks';
import { IconButton } from '@mui/material';
import { MapIcon } from '@/icons';
import { FlexColumn } from '@/layouts';
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
  return (
    <div className={styles.search_box}>
      <IconButton>
        <MapIcon />
      </IconButton>
      <Input
        value={value}
        placeholder='장소 주소 식당 검색'
        border={false}
        onChange={handleChange}
        textAlign='left'
        className={styles.search_box__input}
      />
    </div>
  );
};

const SearchResult = ({ searchResult }: { searchResult: kakao.maps.services.PlacesSearchResult }) => {
  return (
    <div className={styles.search_result}>
      <FlexColumn className={styles.search_result__content}>
        {searchResult.map((item) => (
          <div>{item.place_name}</div>
        ))}
      </FlexColumn>
    </div>
  );
};
