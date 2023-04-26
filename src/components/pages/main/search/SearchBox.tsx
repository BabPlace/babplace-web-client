import React from 'react';
import cn from 'classnames';
import { useQuery } from '@/hooks';
import { Input } from '@/layouts';
import { SearchIcon, IosBackIcon } from '@/icons';
import { IconButton } from '@mui/material';
import styles from '@/styles/Search.module.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isShadow?: boolean;
  focus?: boolean;
} & (
    | {
        disabled: true;
        handleClose?: never;
      }
    | {
        disabled?: false;
        handleClose: () => void;
      }
  );

const SearchBox = ({ value, handleChange, placeholder, isShadow = true, disabled = false, handleClose, focus, ...props }: Props) => {
  const { drawer } = useQuery();

  return (
    <div className={cn(styles.search_box, drawer ? styles.scale_down : '', isShadow ? styles.shadow : styles.no_shadow)} {...props}>
      <IconButton onClick={handleClose}>{disabled ? <SearchIcon /> : <IosBackIcon />}</IconButton>
      <Input
        focus={focus}
        value={value}
        placeholder={placeholder}
        border={false}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        disabled={disabled}
        textAlign='left'
        className={styles.search_box__input}
      />
    </div>
  );
};

export default React.memo(SearchBox);
