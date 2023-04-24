import React from 'react';
import Modal from '../modal/Modal';
import { FlexColumn, FlexRow, TypoNotoSans } from '@/layouts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@mui/material';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useGuide } from '@/hooks';
import {
  VeryDissatisfiedIcon,
  SatisfiedAltIcon,
  VerySatisfiedIcon,
  SickIcon,
  PlaceIcon,
  RenameIcon,
  RestaurantIcon,
  RouteIcon,
} from '@/icons';
import styled from '@emotion/styled';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HowToUse = () => {
  const { isShow, hide, doNotShowAgain } = useGuide('main');
  SwiperCore.use([Navigation, Pagination]);
  return (
    <Modal isShow={isShow} hide={hide}>
      <FlexColumn justifyContent='space-between' alignItems='center' height='100%'>
        <HowToUseHeader />
        <HowToUseBody />
        <HowToUseFooter doNotShowAgain={doNotShowAgain} />
      </FlexColumn>
    </Modal>
  );
};

export default HowToUse;

const HowToUseHeader = () => {
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

const HowToUseBody = () => {
  const bodyTypoStyle = { variant: 'body1' as const, noWrap: false };
  const swiperStyle = { width: '100%', height: '100%' };
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} spaceBetween={50} style={swiperStyle}>
      <SwiperSlide>
        <SwiperSlideItem>
          <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
            <PlaceIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verygood-rgb))' }} />
            <TypoNotoSans text='원하는 지역 선택하기' fontWeight={600} {...bodyTypoStyle} />
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
            <RenameIcon fontSize='large' sx={{ color: 'rgb(var(--gola-good-rgb))' }} />
            <TypoNotoSans text='팀 이름 만들기' fontWeight={600} {...bodyTypoStyle} />
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
            <RestaurantIcon fontSize='large' sx={{ color: 'rgb(var(--gola-bad-rgb))' }} />
            <TypoNotoSans text='추천받을 식당 개수 정하기' fontWeight={600} {...bodyTypoStyle} />
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
            <RouteIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verybad-rgb))' }} />
            <TypoNotoSans text='4. 원하는 거리 고르기' fontWeight={600} {...bodyTypoStyle} />
          </FlexRow>
        </SwiperSlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem>
          <FlexRow alignItems='center' justifyContent='flex-start' width='100%' gap='10px'>
            <VerySatisfiedIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verygood-rgb))' }} />
            <TypoNotoSans {...bodyTypoStyle}>
              <b>위로 스와이프</b>해서 <b>짱 좋아요</b>
            </TypoNotoSans>
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' width='100%' gap='10px'>
            <SatisfiedAltIcon fontSize='large' sx={{ color: 'rgb(var(--gola-good-rgb))' }} />
            <TypoNotoSans {...bodyTypoStyle}>
              <b>오른쪽으로 스와이프</b>해서 <b>좋아요</b>
            </TypoNotoSans>
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' width='100%' gap='10px'>
            <VeryDissatisfiedIcon fontSize='large' sx={{ color: 'rgb(var(--gola-bad-rgb))' }} />
            <TypoNotoSans {...bodyTypoStyle}>
              <b>왼쪽으로 스와이프</b>해서 <b>싫어요</b>
            </TypoNotoSans>
          </FlexRow>
          <FlexRow alignItems='center' justifyContent='flex-start' width='100%' gap='10px'>
            <SickIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verybad-rgb))' }} />
            <TypoNotoSans {...bodyTypoStyle}>
              아래로 스와이프해서 <b>알러지, 비건</b>등의 이유로 제외하고 싶은 식당을 표현하세요
            </TypoNotoSans>
          </FlexRow>
        </SwiperSlideItem>
      </SwiperSlide>
    </Swiper>
  );
};

const HowToUseFooter = ({ doNotShowAgain }: { doNotShowAgain: () => void }) => {
  return (
    <Button onClick={doNotShowAgain}>
      <TypoNotoSans variant='caption' text='다시 보지 않기' color='rgb(var(--caption-foreground-rgba))' />
    </Button>
  );
};

const SwiperSlideItem = styled.div`
  padding: 30px 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
