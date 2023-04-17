import React, { useCallback, useMemo } from 'react';
import Input from './Input';
import { useInput, useSearch, useQuery } from '@/hooks';
import { IconButton } from '@mui/material';
import { HomeIcon, MapIcon, SearchIcon } from '@/icons';
import { FlexColumn, FlexRow, TypoNotoSans, Visible } from '@/layouts';
import styles from '@/styles/Search.module.css';
import { distanceFormat } from '@/utils';

type SearchBoxProps = { value: string; handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
type SearchResultProps = { value: string; searchResult: kakao.maps.services.PlacesSearchResult; reset: () => void };
type Props = {
  location: { lat: number; lng: number };
};

const Search = ({ location }: Props) => {
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

const SearchBox = ({ value, handleChange }: SearchBoxProps) => {
  const { isDefault, isCustom, setQuery } = useQuery();

  const handleIconClicked = useCallback(() => {
    setQuery('mode', isCustom ? 'search' : 'custom');
  }, [isCustom]);

  const SearchBoxIcon = useMemo(() => {
    return isCustom ? <SearchIcon /> : <MapIcon />;
  }, [isCustom]);

  return (
    <Visible visible={!isDefault} className={styles.search_box}>
      <IconButton onClick={handleIconClicked}>{SearchBoxIcon}</IconButton>
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

const SearchResult = ({ value, searchResult, reset }: SearchResultProps) => {
  const { isSearch, isDefault } = useQuery();

  const isValidDelim = (delim: string) => {
    const regex = /^[a-zA-Z0-9가-힣\s]*$/;
    return regex.test(delim);
  };
  const splitValue = (source: string, delim: string) => {
    if (!isValidDelim(delim)) {
      return [source];
    }
    return source.split(new RegExp(`(${delim})`, 'gi'));
  };

  if (isDefault) reset();

  return (
    <Visible visible={isSearch} className={styles.search_result}>
      <div>
        <ul className={styles.search_result__ul}>
          {searchResult.map((item) => (
            <li key={item.id} className={styles.search_result__li}>
              <FlexRow alignItems='center' gap='15px'>
                <FlexColumn alignItems='center'>
                  <HomeIcon />
                  <TypoNotoSans
                    text={distanceFormat(parseInt(item.distance))}
                    variant='caption'
                    fontSize='0.2rem'
                    color='rgba(var(--caption-foreground-rgba))'
                  />
                </FlexColumn>
                <FlexColumn>
                  <div>
                    {splitValue(item.place_name, value).map((word) =>
                      word.toLowerCase() === value.toLowerCase() ? (
                        <TypoNotoSans text={word} component='span' fontSize='0.9rem' color='blue' />
                      ) : (
                        <TypoNotoSans text={word} component='span' fontSize='0.9rem' />
                      )
                    )}
                  </div>
                  <TypoNotoSans text={item.road_address_name} variant='caption' color='rgba(var(--secondary-foreground-rgba))' />
                </FlexColumn>
              </FlexRow>
            </li>
          ))}
        </ul>
      </div>
    </Visible>
  );
};
