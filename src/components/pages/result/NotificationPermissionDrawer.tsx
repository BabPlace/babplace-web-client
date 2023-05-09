import React, { useEffect, useState } from 'react';
import { useWebPush, useQuery } from '@/hooks';
import { Checkbox } from '@mui/material';
import { isPwaBrowser } from '@/utils';
import { NotificationsActiveIcon } from '@/icons';
import { SwipeableEdgeDrawer, TypoNotoSans, ProgressButton, FlexRow, FlexColumn, Visible } from '@/layouts';
import { PWAGuide } from '@/components/guide';

const NotificationPermissionDrawer = () => {
  const { isRegistered, isSubscribed, notificationPermission, subscribeButtonHandler } = useWebPush();
  const { setQuery } = useQuery();
  const [isChecked, setIsChecked] = useState(false);
  const [isIosSafariNoPWA, setIsIosSafariNoPWA] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const hide = () => {
    setIsShow(false);
  };

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    if (!navigator) return;
    const isIosSafari = navigator.userAgent.match(/(iPod|iPhone|iPad).+\bSafari\b/);
    if (isIosSafari && !isPwaBrowser()) {
      setIsIosSafariNoPWA(true);
    }
  }, []);

  useEffect(() => {
    if (isRegistered) {
      setIsShow(false);
      return;
    }
    if (notificationPermission === 'default' || notificationPermission === 'granted') setIsShow(true);
  }, [isRegistered, notificationPermission]);

  return (
    <>
      <PWAGuide />
      <SwipeableEdgeDrawer hidden={!(isShow && isIosSafariNoPWA)} swipeable={false}>
        <FlexColumn gap='15px' width='100%'>
          <FlexColumn>
            <FlexRow alignItems='center' gap='5px'>
              <NotificationsActiveIcon />
              <TypoNotoSans variant='h6' text='투표 종료 알림을 받을 수 있어요!' />
            </FlexRow>
            <TypoNotoSans
              color='rgba(var(--secondary-foreground-rgba))'
              variant='caption'
              noWrap={false}
              text='밥풀레이스를 어플리케이션으로 설치하고 알림을 받아보세요! 세번의 터치로 간편하게 설치해보세요:)'
            />
          </FlexColumn>
          <FlexRow gap='10px'>
            <ProgressButton isLoaded={true} fullWidth color='neutral' variant='contained' onClick={hide}>
              괜찮아요
            </ProgressButton>
            <ProgressButton
              isLoaded={true}
              fullWidth
              variant='contained'
              onClick={() => {
                hide();
                setQuery('pwa', 'true');
              }}
            >
              설치할게요!
            </ProgressButton>
          </FlexRow>
        </FlexColumn>
      </SwipeableEdgeDrawer>
      <SwipeableEdgeDrawer hidden={!isShow || isIosSafariNoPWA} swipeable={false}>
        <FlexColumn gap='15px' width='100%'>
          <FlexColumn>
            <FlexRow alignItems='center' gap='5px'>
              <NotificationsActiveIcon />
              <TypoNotoSans variant='h6' text='투표 종료 알림을 받을 수 있어요!' />
            </FlexRow>
            <TypoNotoSans
              color='rgba(var(--secondary-foreground-rgba))'
              variant='caption'
              noWrap={false}
              text='아직 모든 팀원이 투표에 참여하지 않았어요. 투표가 종료되었을때 저희가 알림을 보내드릴 수 있어요!'
            />
          </FlexColumn>
          <Visible visible={!isSubscribed && notificationPermission === 'default'}>
            <FlexRow alignItems='center' gap='5px' onClick={handleChecked}>
              <Checkbox
                color='error'
                size='small'
                checked={isChecked}
                sx={{
                  padding: '0',
                  color: '#d32f2f',
                }}
              />
              <TypoNotoSans variant='body2' color='error' text='결과에 대한 푸시 알림 수신에 동의합니다' noWrap={true} />
            </FlexRow>
          </Visible>
          <FlexRow gap='10px'>
            <ProgressButton isLoaded={true} fullWidth color='neutral' variant='contained' onClick={hide}>
              이 팀은 괜찮아요
            </ProgressButton>
            <ProgressButton
              isLoaded={true}
              fullWidth
              variant='contained'
              disabled={notificationPermission !== 'granted' && !isChecked}
              onClick={() => {
                subscribeButtonHandler(hide);
              }}
            >
              받을게요!
            </ProgressButton>
          </FlexRow>
        </FlexColumn>
      </SwipeableEdgeDrawer>
    </>
  );
};

export default NotificationPermissionDrawer;
