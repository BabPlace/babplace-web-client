import React from 'react';
import { FlexRow, FlexColumn, TypoNotoSans } from '@/layouts';
import type { SelectPlace } from '@/interfaces';
import styles from '@/styles/SelectsBox.module.css';
import { CategoryIcon } from '@/icons';
import { IconButton, Button } from '@mui/material';

type SelectsBodyProps = {
  selects: SelectPlace[];
  actionButton: React.ReactNode;
  action: (select: SelectPlace, index: number) => void;
  emptyAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SelectsBox = ({ selects, actionButton, action, emptyAction }: SelectsBodyProps) => {
  if (selects.length === 0) {
    return (
      <FlexColumn alignItems='center' justifyContent='center' height='100%' gap='30px'>
        <TypoNotoSans text='텅' variant='h1' />
        <TypoNotoSans text='밥 목록이 비어있어요' variant='caption' />
        <Button variant='outlined' className={styles.add_button} onClick={emptyAction}>
          <TypoNotoSans text='🍚 채우러가기 ' />
        </Button>
      </FlexColumn>
    );
  }
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
