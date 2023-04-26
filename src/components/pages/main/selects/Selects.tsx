import React, { useState, useContext } from 'react';
import { IconButton } from '@mui/material';
import cn from 'classnames';
import { SelectsContext, FullScreenModal, Confirm } from '@/components';
import { FlexRow, FlexColumn, TypoNotoSans } from '@/layouts';
import { useConfirm, useInput } from '@/hooks';
import { addressSumary } from '@/utils';
import { RemoveIcon } from '@/icons';
import SearchBox from '../search/SearchBox';
import type { SelectPlace } from '@/interfaces';
import styled from '@emotion/styled';
import styles from '@/styles/Selects.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Selects = () => {
  const { value, handleChange } = useInput('');
  const [slideIndex, setSlideIndex] = useState(0);
  const { isShow, selects, hide, removeSelects } = useContext(SelectsContext);

  SwiperCore.use([Navigation, Pagination]);

  return (
    <FullScreenModal isShow={isShow}>
      <SearchBox value={value} handleChange={handleChange} placeholder='장소 검색' isShadow={false} handleClose={hide} />
      <div className={styles.container}>
        <div className={styles.content}>
          <FlexRow className={styles.tabs_title} justifyContent='stretch'>
            <TabsTitleHighlighter slideIndex={slideIndex} />
            <TabsTitleItem title='선택한 식당' isSelected={slideIndex === 0} />
            <TabsTitleItem title='좋아요' isSelected={slideIndex === 1} />
          </FlexRow>
          <Swiper
            spaceBetween={50}
            style={swiperStyle}
            onSlideChange={(swiper) => {
              setSlideIndex(swiper.realIndex);
            }}
          >
            <SwiperSlide>
              <SelectsBody selects={selects} removeSelects={removeSelects} />
            </SwiperSlide>
            <SwiperSlide>
              <FlexColumn>hihi</FlexColumn>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </FullScreenModal>
  );
};

export default Selects;

const swiperStyle = { width: '100%', height: '100%' };
const textPrimary = 'rgba(var(--primary-foreground-rgba))';
const textSecondary = 'rgba(var(--tertiary-foreground-rgb))';

const TabsTitleItem = ({ title, isSelected }: { title: string; isSelected: boolean }) => {
  return <TypoNotoSans text={title} color={isSelected ? textPrimary : textSecondary} className={styles.tabs_title__item} />;
};

const TabsTitleHighlighter = styled.div<{ slideIndex: number }>`
  position: absolute;
  top: 0;
  width: 50%;
  height: 40px;
  border-bottom: 1px solid rgba(var(--secondary-foreground-rgba));
  transform: ${({ slideIndex }) => `translateX(calc(${slideIndex} * 100%))`};
  transition: transform 0.3s ease-in-out;
`;

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
