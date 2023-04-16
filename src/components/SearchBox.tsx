import React, { useEffect, useState } from 'react';
import Input from './Input';
import { useInput } from '@/hooks';
import { IconButton } from '@mui/material';
import { CloseIcon } from '@/icons';
import { FlexColumn } from '@/layouts';

import styles from '@/styles/SearchBox.module.css';

type Props = {
  location: { lat: number; lng: number };
};

const SearchBox = ({ location }: Props) => {
  const { value, handleChange, inputRef } = useInput('');
  const [searchResult, setSearchResult] = useState<kakao.maps.services.PlacesSearchResult>([]);

  useEffect(() => {
    if (value.length === 0) {
      setSearchResult([]);
      return;
    }
    const ps = new kakao.maps.services.Places();
    const center = new kakao.maps.LatLng(location.lat, location.lng);
    ps.keywordSearch(
      value,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setSearchResult(data);
        }
      },
      {
        location: center,
      }
    );
  }, [value]);

  return (
    <>
      <div className={styles.search_box}>
        <IconButton>
          <CloseIcon />
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
      <div className={styles.search_result}>
        <FlexColumn className={styles.search_result__content}>
          {searchResult.map((item) => (
            <div>{item.place_name}</div>
          ))}
        </FlexColumn>
      </div>
    </>
  );
};

export default SearchBox;
