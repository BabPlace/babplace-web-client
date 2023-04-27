import React, { useState, useContext } from 'react';
import { SelectsContext, FullScreenModal, Confirm } from '@/components';
import { useConfirm, useInput, useLike } from '@/hooks';
import { RemoveIcon, AddIcon } from '@/icons';
import { filterPlace } from '@/utils';

import Tabs from './Tabs';
import SelectsBox from './SelectsBox';
import SearchBox from '../search/SearchBox';

import type { SelectPlace } from '@/interfaces';

import styled from '@emotion/styled';
import styles from '@/styles/Selects.module.css';

const Selects = () => {
  const { isShow: isConfirmShow, open, handleClose } = useConfirm();
  const { value, handleChange, reset } = useInput('');
  const { isShow, hide, removeSelects } = useContext(SelectsContext);
  const [select, setSelect] = useState<SelectPlace>();

  function set(select: SelectPlace) {
    setSelect(select);
  }

  return (
    <FullScreenModal isShow={isShow}>
      <SearchBox value={value} handleChange={handleChange} placeholder='장소 검색' reset={reset} isShadow={false} handleClose={hide} />
      <div className={styles.container}>
        <div className={styles.content}>
          <Tabs
            titles={['선택한 식당', '좋아요']}
            contents={[<SelectsItems value={value} open={open} set={set} />, <LikeItems value={value} />]}
          />
        </div>
      </div>
      <Confirm
        isShow={isConfirmShow}
        message={select?.place_name + ' 삭제할까요?'}
        handleConfirm={() => {
          select && removeSelects(select);
          handleClose();
        }}
        handleClose={handleClose}
      />
    </FullScreenModal>
  );
};

export default Selects;

const SelectsItems = ({ value, open, set }: { value: string; open: () => void; set: (select: SelectPlace) => void }) => {
  const { selects } = useContext(SelectsContext);

  return (
    <SelectsBox
      selects={filterPlace(selects, value)}
      actionButton={<RemoveIcon fontSize='small' color='error' />}
      action={(select) => {
        open();
        set(select);
      }}
    />
  );
};

const LikeItems = ({ value }: { value: string }) => {
  const { addSelects } = useContext(SelectsContext);
  const { likeItems } = useLike(null);

  return (
    <SelectsBox
      selects={filterPlace(likeItems, value)}
      actionButton={<AddIcon fontSize='small' color='info' />}
      action={(select) => {
        addSelects(select);
      }}
    />
  );
};
