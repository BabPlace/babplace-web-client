import React, { useState, useContext } from 'react';
import { SelectsContext, Modal, Confirm } from '@/components';
import { FlexRow, FlexColumn, TypoNotoSans } from '@/layouts';
import { addressSumary } from '@/utils';
import type { SelectPlace } from '@/interfaces';
import { IconButton } from '@mui/material';
import { RemoveIcon } from '@/icons';
import styled from '@emotion/styled';
import styles from '@/styles/Selects.module.css';
import useConfirm from '@/hooks/useConfirm';

const Selects = () => {
  const { isShow, selects, hide, removeSelects } = useContext(SelectsContext);

  return (
    <Modal isShow={isShow} hide={hide} animationDelay={false}>
      <FlexColumn height='100%'>
        <SelectsHeader />
        <SelectsBody selects={selects} removeSelects={removeSelects} />
      </FlexColumn>
    </Modal>
  );
};

export default Selects;

const SelectsHeader = () => {
  return <TypoNotoSans text='선택한 식당 목록' variant='h6' textAlign='center' marginBottom='10px' />;
};

type SelectsBodyProps = { selects: SelectPlace[]; removeSelects: (select: SelectPlace) => void };
const SelectsBody = ({ selects, removeSelects }: SelectsBodyProps) => {
  const { isShow, open, handleConfirm, handleClose } = useConfirm();
  const [select, setSelect] = useState<SelectPlace>();
  return (
    <>
      <ul className={styles.items}>
        {selects.map((select, index) => (
          <li key={select.id + index} className={styles.item}>
            <FlexRow justifyContent='space-between' alignItems='center' height='100%'>
              <FlexColumn>
                <TypoNotoSans text={select.place_name} variant='h6' />
                <TypoNotoSans text={addressSumary(select) + ' 근처'} variant='caption' />
              </FlexColumn>
              <IconButton
                size='small'
                onClick={() => {
                  open();
                  setSelect(select);
                }}
              >
                <RemoveIcon fontSize='small' color='error' />
              </IconButton>
            </FlexRow>
          </li>
        ))}
      </ul>
      <Confirm
        isShow={isShow}
        message={select?.place_name + ' 삭제할까요?'}
        handleConfirm={() => {
          select && removeSelects(select);
          handleClose();
        }}
        handleClose={handleClose}
      />
    </>
  );
};

const SelectsItem = styled.div``;
