import React, { useEffect } from 'react';
import { useInput, useSearch, useQuery, useSearchResultDrawerButtons } from '@/hooks';
import SearchBox from './SearchBox';
import SearchResultBox from './SearchResultBox';
import SearchResultDrawer from './SearchResultDrawer';
import { AlertSnackBar } from '@/components';
import type { SetLocation } from '@/hooks/useMainMap';

type Props = {
  location: { lat: number; lng: number };
  addSelects: (newSelect: kakao.maps.services.PlacesSearchResultItem) => void;
  setLocation: SetLocation;
};

const Search = ({ location, addSelects, setLocation }: Props) => {
  const { isCustom } = useQuery();
  const { value, reset, handleChange } = useInput('');
  const { searchResults, selectedSearchResult, handleClickSearchResult, clearSelectedSearchResult } = useSearch(
    value,
    location.lat,
    location.lng,
    setLocation
  );
  const { open, clear, add, share, handleClose } = useSearchResultDrawerButtons(
    selectedSearchResult,
    reset,
    clearSelectedSearchResult,
    addSelects
  );

  useEffect(() => {
    if (isCustom) {
      clear();
    }
  }, [isCustom]);

  return (
    <>
      <SearchBox value={value} handleChange={handleChange} />
      <SearchResultBox value={value} searchResult={searchResults} handleClickResult={handleClickSearchResult} />
      <SearchResultDrawer
        isHidden={!isCustom || selectedSearchResult === null}
        add={add}
        clear={clear}
        share={share}
        selectedSearchResult={defaultResult}
      />
      <AlertSnackBar open={open} handleClose={handleClose} message='클립보드에 복사되었습니다' severity='info' />
    </>
  );
};

export default Search;

const defaultResult: kakao.maps.services.PlacesSearchResultItem = {
  id: '123',
  place_name: '서울역',
  x: '0',
  y: '0',
  address_name: '서울 서대문구 홍은동',
  category_name: '여행 > 관광,명소 > 도보여행 > 둘레길 > 북한산둘레길',
  phone: 'default',
  category_group_code: '',
  category_group_name: 'default',
  distance: '5319',
  place_url: 'http://place.map.kakao.com/12544587',
  road_address_name: '',
};
