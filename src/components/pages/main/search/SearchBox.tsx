import React from 'react';
import cn from 'classnames';
import { useQuery } from '@/hooks';
import { Input, Visible } from '@/layouts';
import { SearchIcon, IosBackIcon, CloseIcon } from '@/icons';
import { IconButton } from '@mui/material';
import styles from '@/styles/Search.module.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  reset: () => void;
  handleClose: () => void;
  isSearch?: boolean;
  isShadow?: boolean;
};

const SearchBox = ({ value, handleChange, placeholder, reset, isShadow = true, handleClose, isSearch = true, ...props }: Props) => {
  const { drawer } = useQuery();

  return (
    <div className={cn(styles.search_box, drawer ? styles.scale_down : '', isShadow ? styles.shadow : styles.no_shadow)} {...props}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleClose && handleClose();
        }}
      >
        {isSearch ? <IosBackIcon /> : <SearchIcon />}
      </IconButton>
      <Input
        value={value}
        placeholder={placeholder}
        border={false}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        textAlign='left'
        className={styles.search_box__input}
      />
      <Visible visible={value.length !== 0}>
        <IconButton size='small' onClick={reset}>
          <CloseIcon />
        </IconButton>
      </Visible>
    </div>
  );
};

export default React.memo(SearchBox);
