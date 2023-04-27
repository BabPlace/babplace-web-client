import React from 'react';
import { FlexRow, FlexColumn, TypoNotoSans } from '@/layouts';
import type { SelectPlace } from '@/interfaces';
import styles from '@/styles/SelectsBox.module.css';
import { CategoryIcon } from '@/icons';
import { IconButton } from '@mui/material';

type SelectsBodyProps = {
  selects: SelectPlace[];
  actionButton: React.ReactNode;
  action: (select: SelectPlace, index: number) => void;
};

const SelectsBox = ({ selects, actionButton, action }: SelectsBodyProps) => {
  return (
    <ul className={styles.items}>
      {selects.map((select, index) => (
        <li key={select.id + index} className={styles.item}>
          <FlexRow justifyContent='space-between' alignItems='center' height='100%'>
            <FlexRow gap='10px'>
              <CategoryIcon category={select.category_group_name} />
              <FlexColumn>
                <TypoNotoSans text={select.place_name} variant='body1' />
              </FlexColumn>
            </FlexRow>
            <IconButton
              size='small'
              onClick={() => {
                action(select, index);
              }}
            >
              {actionButton}
            </IconButton>
          </FlexRow>
        </li>
      ))}
    </ul>
  );
};

export default SelectsBox;
