import React, { useState, useContext, useEffect } from 'react';
import { useConfirm, useInput, useLike } from '@/hooks';
import { FullScreenModal, Confirm } from '@/components';
import { RemoveIcon, AddIcon } from '@/icons';
import { filterPlace } from '@/utils';
import { SelectsContext } from '@/context';
import Tabs from './Tabs';
import SelectsBox from './SelectsBox';
import SearchBox from '../search/SearchBox';
import type { SelectPlace } from '@/interfaces';
import styles from '@/styles/Selects.module.css';
import styled from '@emotion/styled';
import { TypoNotoSans } from '@/layouts';

const Selects = () => {
  const { isShow: isConfirmShow, open, handleClose } = useConfirm();
  const { value, handleChange, reset } = useInput('');
  const { isShow, hide, removeSelects } = useContext(SelectsContext);
  const [select, setSelect] = useState<SelectPlace>();

  function set(select: SelectPlace) {
    setSelect(select);
  }

  if (!isShow) return <div></div>;
  return (
    <FullScreenModal isShow={isShow}>
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
      <SearchBox value={value} handleChange={handleChange} placeholder='장소 검색' reset={reset} isSearch={true} handleClose={hide} />
    </FullScreenModal>
  );
};

export default Selects;

const SelectsItems = ({ value, open, set }: { value: string; open: () => void; set: (select: SelectPlace) => void }) => {
  const { selects, hide } = useContext(SelectsContext);

  return (
    <SelectsBox
      selects={filterPlace(selects, value)}
      actionButton={<RemoveIcon fontSize='small' color='error' />}
      action={(select) => {
        open();
        set(select);
      }}
      emptyAction={hide}
    />
  );
};

const LikeItems = ({ value }: { value: string }) => {
  const { addSelects, hide } = useContext(SelectsContext);
  const { likeItems } = useLike(null);
  const [continuity, setContinuity] = useState<string[]>([]);
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);

  useEffect(() => {
    if (continuity.length === 0) return;
    let timer: NodeJS.Timeout;
    if (isShowToastMessage) {
      timer = setTimeout(() => {
        setIsShowToastMessage(false);
      }, 3000);
    } else {
      setContinuity([]);
    }
    return () => {
      console.log('clear : ', timer);
      clearTimeout(timer);
    };
  }, [isShowToastMessage, continuity]);

  return (
    <>
      <SelectsBox
        selects={filterPlace(likeItems, value)}
        actionButton={<AddIcon fontSize='small' color='info' />}
        action={(select) => {
          setIsShowToastMessage(true);
          addSelects(select);
          if (!continuity.includes(select.id)) setContinuity((prev) => [...prev, select.id]);
        }}
        emptyAction={hide}
      />
      <ToastMessage isShowToastMessage={isShowToastMessage}>
        <TypoNotoSans>{continuity.length}개의 식당을 추가하였습니다</TypoNotoSans>
      </ToastMessage>
    </>
  );
};

const ToastMessage = styled.div<{ isShowToastMessage: boolean }>`
  display: ${({ isShowToastMessage }) => (isShowToastMessage ? '' : 'none')};
  position: absolute;
  border-radius: 100px;
  border: 1px solid rgba(var(--secondary-foreground-rgba));
  color: rgba(var(--secondary-foreground-rgba));
  padding: 5px 10px;
  bottom: 100px;
  left: 50%;

  transform: translateX(-50%);
  animation: fadeIn 3s ease-in-out 0s forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
