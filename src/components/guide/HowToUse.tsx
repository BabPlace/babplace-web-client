import React from 'react';
import Modal from '../modal/Modal';
import { FlexColumn, FlexRow, TypoNotoSans } from '@/layouts';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Button, Divider } from '@mui/material';
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
  SearchIcon,
  FormatListIcon,
  CheckIcon,
  HeartIcon,
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
      {isShow && (
        <FlexColumn justifyContent='space-between' alignItems='center' height='100%'>
          <HowToUseHeader />
          <HowToUseBody />
          <HowToUseFooter doNotShowAgain={doNotShowAgain} />
        </FlexColumn>
      )}
    </Modal>
  );
};

export default HowToUse;

const HowToUseHeader = () => {
  return (
    <FlexColumn alignItems='center'>
      <TypoNotoSans text='🍚  밥풀레이스 사용방법  🍚' variant='caption' textAlign='center' marginBottom='10px' />
      <Divider sx={{ width: '50px' }} />
      {/* <TypoNotoSans
        text='밥풀레이스는 선택한 지역의 식당을 추천해줘요! 친구들과 함께 오늘의 밥집을 뽑아봐요!'
        noWrap={false}
        variant='body2'
        textAlign='center'
        paddingX='30px'
      /> */}
    </FlexColumn>
  );
};

const HowToUseBody = () => {
  const swiperStyle = { width: '100%', height: '100%' };
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} spaceBetween={50} style={swiperStyle}>
      <SwiperSlide>
        <SwiperSlideItem>
          <Page0 />
        </SwiperSlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem>
          <Page1 />
        </SwiperSlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SwiperSlideItem>
          <Page2 />
        </SwiperSlideItem>
      </SwiperSlide>
    </Swiper>
  );
};

const Page0 = () => {
  const bodyTypoStyle = { variant: 'body2' as const, noWrap: false };
  return (
    <>
      <FlexColumn alignItems='center' gap='5px'>
        <TypoNotoSans variant='body1' fontWeight={600} fontSize='1.2rem'>
          <span style={{ color: '#ff506f' }}>나만의 식당</span>
          {' 목록 만들기'}
        </TypoNotoSans>
        <TypoNotoSans
          variant='caption'
          color='rgba(var(--secondary-foreground-rgba))'
          fontWeight={600}
          noWrap={false}
          lineHeight={2}
          textAlign='center'
        >
          <ButtonShape>🍙직접 추가하기</ButtonShape> 버튼을 눌러 원하는 식당들로만 이루어진 투표를 만들어 보세요
        </TypoNotoSans>
      </FlexColumn>
      <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
        <SearchIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verygood-rgb))' }} />
        <TypoNotoSans text='원하는 식당 검색, 추가하기' fontWeight={600} {...bodyTypoStyle} />
      </FlexRow>
      <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
        <HeartIcon fontSize='large' sx={{ color: 'rgb(var(--gola-good-rgb))' }} />
        <TypoNotoSans text='자주가는 식당 찜하기' fontWeight={600} {...bodyTypoStyle} />
      </FlexRow>
      <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
        <FormatListIcon fontSize='large' sx={{ color: 'rgb(var(--gola-bad-rgb))' }} />
        <TypoNotoSans text='선택한 식당 목록 확인하기' fontWeight={600} {...bodyTypoStyle} />
      </FlexRow>
      <FlexRow alignItems='center' justifyContent='flex-start' gap='10px'>
        <CheckIcon fontSize='large' sx={{ color: 'rgb(var(--gola-verybad-rgb))' }} />
        <TypoNotoSans text='완료버튼 누르기' fontWeight={600} {...bodyTypoStyle} />
      </FlexRow>
    </>
  );
};

const Page1 = () => {
  const bodyTypoStyle = { variant: 'body2' as const, noWrap: false };
  return (
    <>
      <FlexColumn alignItems='center' gap='5px'>
        <TypoNotoSans variant='body1' fontWeight={600} fontSize='1.2rem'>
          <span style={{ color: '#b850ff' }}>랜덤식당</span>
          {' 추천 받기'}
        </TypoNotoSans>
        <TypoNotoSans
          variant='caption'
          color='rgba(var(--secondary-foreground-rgba))'
          fontWeight={600}
          noWrap={false}
          lineHeight={2}
          textAlign='center'
        >
          <ButtonShape>👻식당 추천받기</ButtonShape> 버튼을 눌러 선택한 지역 주변의 추천 식당 목록을 받아보세요
        </TypoNotoSans>
      </FlexColumn>
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
        <TypoNotoSans text='원하는 거리 고르기' fontWeight={600} {...bodyTypoStyle} />
      </FlexRow>
    </>
  );
};
const Page2 = () => {
  const bodyTypoStyle = { variant: 'body2' as const, noWrap: false };
  return (
    <>
      <FlexColumn alignItems='center' gap='5px'>
        <TypoNotoSans variant='body1' fontWeight={600} fontSize='1.2rem'>
          <span style={{ color: '#11a95b' }}>식당 선호도 </span>
          투표하기
        </TypoNotoSans>
        <TypoNotoSans
          variant='caption'
          color='rgba(var(--secondary-foreground-rgba))'
          fontWeight={600}
          noWrap={false}
          lineHeight={2}
          textAlign='center'
        >
          식당 카드들을 기호에 맞게 스와이프 해보세요! 버튼을 활용해도 좋아요:)
        </TypoNotoSans>
      </FlexColumn>
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
    </>
  );
};

const ButtonShape = styled.span`
  /* position: absolute; */
  /* top: 10px; */
  border: 1px solid rgba(var(--secondary-foreground-rgba));
  border-radius: var(--border-radius);
  padding: 2px 5px;
`;

const HowToUseFooter = ({ doNotShowAgain }: { doNotShowAgain: () => void }) => {
  return (
    <Button onClick={doNotShowAgain}>
      <TypoNotoSans variant='caption' text='다시 보지 않기' color='rgb(var(--caption-foreground-rgba))' />
    </Button>
  );
};

const SwiperSlideItem = styled.div`
  padding: 10px 50px 60px 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
