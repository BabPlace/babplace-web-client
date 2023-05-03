import React from 'react';
import { useQuery } from '@/hooks';
import { FlexColumn, TypoNotoSans, Visible } from '@/layouts';
import { IosShareIcon, SouthIcon } from '@/icons';

import styles from '@/styles/PWAGuide.module.css';
import { Typography } from '@mui/material';

const PWAGuide = () => {
  const { isPWA, setQuery } = useQuery();

  return (
    <Visible
      visible={isPWA}
      className={styles.container}
      onClick={() => {
        setQuery('pwa');
      }}
    >
      <FlexColumn alignItems='center' justifyContent='space-between' height='100%'>
        <FlexColumn alignItems='center' gap='40px' justifyContent='center' className={styles.intro} height='100%'>
          <img src='/icons/icon-512x512.png' className={styles.app_logo} />
          <Typography variant='h3' fontFamily={`'Dongle', sans-serif`}>
            밥풀레이스 앱
          </Typography>
          <TypoNotoSans {...guideTypoStyle} fontSize='0.9rem'>
            화면 아래에 있는 공유하기 버튼을 누른 후, '홈 화면에 추가' 혹은 'Add to home screen'을 찾아서 눌러주세요.
          </TypoNotoSans>
          <TypoNotoSans color='rgb(var(--tertiary-foreground-rgb))' {...guideTypoStyle} fontSize='0.8rem'>
            브라우저 버전에 따라 정상적으로 설치되지 않을 수 있습니다. 최신 버전의 브라우저를 권장합니다.
          </TypoNotoSans>
        </FlexColumn>
        <FlexColumn alignItems='center' justifyContent='space-between' gap='60px' className={styles.guide}>
          <FlexColumn alignItems='center' justifyContent='space-between' gap='20px'>
            <TypoNotoSans variant='body2' fontWeight={600} letterSpacing={1.5}>
              아래의 <IosShareIcon color='primary' className={styles.share_icon} /> 버튼을 누른 후
            </TypoNotoSans>
            <TypoNotoSans variant='body2' fontWeight={600} letterSpacing={1.5}>
              '홈 화면에 추가' 선택
            </TypoNotoSans>
          </FlexColumn>
          <SouthIcon className={styles.south_icon} />
        </FlexColumn>
      </FlexColumn>
    </Visible>
  );
};

export default PWAGuide;

const guideTypoStyle = {
  noWrap: false,
  textAlign: 'center' as const,
  lineHeight: 2,
  fontWeight: 600,
};
