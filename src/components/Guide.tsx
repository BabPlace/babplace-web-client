import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Button, Backdrop } from '@mui/material';
import { useGuide } from '@/hooks';
import TypoNotoSans from './TypoNotoSans';
import { FlexColumn } from '@/layouts';

import styled from '@emotion/styled';
import styles from '@/styles/Guide.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  page?: string;
};

const Guide = ({ page = 'main' }: Props) => {
  const { isShow, hide, doNotShowAgain } = useGuide(page);
  SwiperCore.use([Navigation, Pagination]);
  return (
    <>
      <Backdrop open={isShow} onClick={hide} sx={{ zIndex: 'var(--guide-show-z-index)' }} />
      <Container isShow={isShow} className={cn(styles.container)}>
        <FlexColumn justifyContent='space-between' alignItems='center' height='100%'>
          <GuideHeader />
          <GuideBody />
          <GuideFooter doNotShowAgain={doNotShowAgain} />
        </FlexColumn>
      </Container>
    </>
  );
};

export default Guide;

const GuideHeader = () => {
  return (
    <div>
      <TypoNotoSans text='🍚  골라밥 사용방법  🍚' variant='h6' textAlign='center' marginBottom='10px' />
      <TypoNotoSans
        text='골라밥은 선택한 지역의 식당을 추천해줘요! 친구들과 함께 오늘의 식당을 골라봐요!'
        noWrap={false}
        variant='body2'
        textAlign='center'
        paddingX='30px'
      />
    </div>
  );
};

const GuideBody = () => {
  const bodyTypoStyle = { variant: 'body1' as const, textAlign: 'center' as const, noWrap: false };
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} spaceBetween={50} className={styles.mySwiper}>
      <SwiperSlide>
        <SwiperSlideItem>
          <TypoNotoSans text='1. 원하는 지역 선택하기' {...bodyTypoStyle} />
          <TypoNotoSans text='2. 팀 이름 만들기' {...bodyTypoStyle} />
          <TypoNotoSans text='3. 추천받을 식당 개수 정하기' {...bodyTypoStyle} />
          <TypoNotoSans text='4. 원하는 거리 고르기' {...bodyTypoStyle} />
        </SwiperSlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem>
          <TypoNotoSans text='아래로 스와이프 하거나 버튼을 눌러ㅁㄴㅇㄹㅁㄴㄹㅇㅁㄴㄹㅇ' {...bodyTypoStyle} />
        </SwiperSlideItem>
      </SwiperSlide>
    </Swiper>
  );
};

const GuideFooter = ({ doNotShowAgain }: { doNotShowAgain: () => void }) => {
  return (
    <Button onClick={doNotShowAgain} className={styles.donot_button}>
      <TypoNotoSans variant='caption' text='다시 보지 않기' color='rgb(var(--caption-foreground-rgba))' />
    </Button>
  );
};

const Container = styled.div<{ isShow: boolean }>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  z-index: ${({ isShow }) => (isShow ? 'var(--guide-show-z-index)' : 'var(--guide-hide-z-index)')};
  background: rgb(var(--primary-background-rgb));
  transition: opacity 0.3s 0.3s ease-in-out, visibility 0.3s 0.3s ease-in-out, background, color, border-color 0.5s ease-in-out;
`;

const SwiperSlideItem = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
