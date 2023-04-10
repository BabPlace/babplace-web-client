import React from 'react';
import { useGuide } from '@/hooks';
import { CancelRoundedIcon } from '@/icons';
import TypoNotoSans from './TypoNotoSans';
import cn from 'classnames';
import { Button, IconButton, Backdrop } from '@mui/material';
import { FlexColumn } from '@/layouts';
import styled from '@emotion/styled';
import styles from '@/styles/Guide.module.css';

type Props = {
  page?: string;
};

const Guide = ({ page = 'main' }: Props) => {
  const { isShow, hide, doNotShowAgain } = useGuide(page);

  return (
    <Backdrop open={isShow} onClick={hide} sx={{ zIndex: 'var(--guide-show-z-index)' }}>
      <Container isShow={isShow} className={cn(styles.container)}>
        <FlexColumn justifyContent='space-between' alignItems='center' height='100%'>
          <div>
            <TypoNotoSans text='🍚  골라밥 사용방법  🍚' variant='h6' textAlign='center' marginBottom='10px' />
            <TypoNotoSans
              text='골라밥은 선택한 지역의 식당을 추천해줘요! 팀을 만들어서 친구들이 선호하는 식당을 확인해보세요!'
              noWrap={false}
              variant='body2'
              textAlign='center'
              marginBottom='30px'
            />
          </div>
          <div>
            <TypoNotoSans text='1. 원하는 지역 선택하기' variant='body1' textAlign='center' marginBottom='30px' />
            <TypoNotoSans text='2. 팀 이름 만들기' variant='body1' textAlign='center' marginBottom='30px' />
            <TypoNotoSans text='3. 추천받을 식당 개수 정하기' variant='body1' textAlign='center' marginBottom='30px' />
            <TypoNotoSans text='4. 원하는 거리 고르기' variant='body1' textAlign='center' marginBottom='30px' />
          </div>
          <FlexColumn alignItems='center'>
            <IconButton size='large' onClick={hide}>
              <CancelRoundedIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
            <Button onClick={doNotShowAgain}>
              <TypoNotoSans variant='caption' text='다시 보지 않기' color='rgb(var(--caption-foreground-rgba))' />
            </Button>
          </FlexColumn>
        </FlexColumn>
      </Container>
    </Backdrop>
  );
};

export default Guide;

const Container = styled.div<{ isShow: boolean }>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  z-index: ${({ isShow }) => (isShow ? 'var(--guide-show-z-index)' : 'var(--guide-hide-z-index)')};
  background: rgb(var(--primary-background-rgb));
  transition: opacity 0.3s 0.3s ease-in-out, visibility 0.3s 0.3s ease-in-out, background, color, border-color 0.5s ease-in-out;
`;
