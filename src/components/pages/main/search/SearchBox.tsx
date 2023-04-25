import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useQuery } from '@/hooks';
import { Input } from '@/layouts';
import { SearchIcon, IosBackIcon } from '@/icons';
import { IconButton } from '@mui/material';
import styles from '@/styles/Search.module.css';

type Props = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({ value, handleChange }: Props) => {
  const { isSearch, drawer, toggleSearch, setQuery } = useQuery();

  const SearchBoxIcon = useMemo(() => {
    return isSearch ? <IosBackIcon /> : <SearchIcon />;
  }, [isSearch]);

  return (
    <div className={cn(styles.search_box, drawer ? styles.scale_down : '')}>
      <IconButton onClick={toggleSearch}>{SearchBoxIcon}</IconButton>
      <Input
        value={value}
        placeholder='장소 주소 식당 검색'
        border={false}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        textAlign='left'
        className={styles.search_box__input}
      />
    </div>
  );
};

export default SearchBox;
