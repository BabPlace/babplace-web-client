import React, { useContext } from 'react';
import cn from 'classnames';
import { useQuery } from '@/hooks';
import { Input, Visible } from '@/layouts';
import { SearchIcon, IosBackIcon, CloseIcon, NearMeIcon } from '@/icons';
import { IconButton } from '@mui/material';
import { LocationContext } from '@/context';
import styles from '@/styles/Search.module.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  reset: () => void;
  handleClose: () => void;
  isSearch?: boolean;
};

const SearchBox = ({ value, handleChange, placeholder, reset, handleClose, isSearch = true, ...props }: Props) => {
  const { toCurrentPosition } = useContext(LocationContext);
  const { drawer } = useQuery();

  return (
    <div className={cn(styles.search_box, drawer ? styles.scale_down : '')} {...props}>
      <Input
        value={value}
        placeholder={placeholder}
        border={false}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        textAlign='left'
        className={cn(styles.search_box__input, isSearch ? styles.no_shadow : styles.shadow)}
      />
      <IconButton
        className={styles.search_box__left_icon}
        onClick={(e) => {
          handleClose && handleClose();
        }}
      >
        {isSearch ? <IosBackIcon /> : <SearchIcon />}
      </IconButton>
      <Visible visible={!isSearch} className={styles.search_box__nearme_icon}>
        <IconButton
          className={styles.search_box__nearme_icon_button}
          onClick={() => {
            reset();
            toCurrentPosition();
          }}
        >
          <NearMeIcon />
        </IconButton>
      </Visible>
      <Visible visible={isSearch && value.length !== 0} className={styles.search_box__right_icon}>
        <IconButton onClick={reset}>
          <CloseIcon />
        </IconButton>
      </Visible>
    </div>
  );
};

export default React.memo(SearchBox);
