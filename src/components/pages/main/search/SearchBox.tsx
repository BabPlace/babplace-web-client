import React from 'react';
import { useCallback, useMemo } from 'react';
import { useQuery } from '@/hooks';
import { Visible, Input } from '@/layouts';
import { SearchIcon, MapIcon } from '@/icons';
import { IconButton } from '@mui/material';
import styles from '@/styles/Search.module.css';

type Props = {
  value: string;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ value, handleChange }: Props) => {
  const { toggleSearch, isSearch, setQuery } = useQuery();

  const SearchBoxIcon = useMemo(() => {
    return isSearch ? <MapIcon /> : <SearchIcon />;
  }, [isSearch]);

  return (
    <Visible visible={true} className={styles.search_box}>
      <IconButton onClick={toggleSearch}>{SearchBoxIcon}</IconButton>
      <Input
        value={value}
        placeholder='장소 주소 식당 검색'
        border={false}
        onChange={handleChange}
        onClick={() => {
          setQuery('search', 'true');
        }}
        textAlign='left'
        className={styles.search_box__input}
      />
    </Visible>
  );
};

export default SearchBox;
