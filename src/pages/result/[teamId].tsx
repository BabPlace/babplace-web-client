import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { RatioBarChart } from '@teamapdan/weirdchart';
import { Button } from '@mui/material';
import { Header, ErrorBoundary, ResultCard, ResultDetail, AlertSnackBar } from '@/components';
import { sliceByOffset, makeDataset } from '@/utils';
import { BaseUI, ProgressButton, SwipeableEdgeDrawer, TypoNotoSans, Visible } from '@/layouts';
import { useAlert, useCopy, useRecentResult, useWebPush } from '@/hooks';
import { getResult, getTeamInfo } from '@/controller';
import type { ResultResponse, TeamInfoResponse } from '@/interfaces';
import styles from '@/styles/Result.module.css';

type Props = {
  result: ResultResponse;
  teamInfo: TeamInfoResponse;
};

function Page({ result: satisfactions, teamInfo }: Props) {
  const today = new Date();
  const { subscribeButtonHandler } = useWebPush();
  const { toGola, share } = useCopy();
  const { open, handleOpen, handleClose } = useAlert();
  const { addRecentResult } = useRecentResult();
  const [top3, others] = sliceByOffset(satisfactions, 3);

  const [isShowNotificationPermissionAlert, setIsShowNotificationPermissionAlert] = useState(false);
  const toTrue = () => {
    setIsShowNotificationPermissionAlert(true);
  };

  useEffect(() => {
    addRecentResult();
  }, []);

  return (
    <ErrorBoundary>
      <BaseUI title={title} description={description}>
        <Header showButtons={true} />
        <div className={styles.container}>
          <TypoNotoSans text={teamInfo.name} variant='h6' textAlign='center' />
          <TypoNotoSans
            text={`${today.getMonth() + 1}월 ${today.getDate()}일! 오늘의 식당은?`}
            variant='caption'
            textAlign='center'
            marginBottom='20px'
          />
          <div className={styles.flex}>
            {top3.map((satisfaction, index) => (
              <ResultCard key={`top3-${satisfaction.restaurantName}-${index}`} title={satisfaction.restaurantName} index={index}>
                <div style={{ height: '20px' }}>
                  <RatioBarChart dataset={makeDataset(satisfaction)} option={{ startAnimation: 'fromEqual', barHeight: 20 }} />
                </div>
                <ResultDetail satisfaction={satisfaction} />
              </ResultCard>
            ))}
            <Visible visible={others.length !== 0}>
              <ResultCard title='🥲 패배자들'>
                <div className={styles.losers}>
                  {others.map((satisfaction, index) => {
                    return (
                      <div key={`others-${satisfaction.restaurantName}-${index}`} className={styles.loser}>
                        <TypoNotoSans text={satisfaction.restaurantName} variant='caption' className={styles.loser__title} />
                        <div className={styles.loser__bar}>
                          <RatioBarChart
                            dataset={makeDataset(satisfaction)}
                            option={{
                              startAnimation: 'fromEqual',
                              barHeight: 25,
                              offsetY: 5,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ResultCard>
            </Visible>

            <div className={styles.button_box}>
              <Button
                variant='contained'
                fullWidth
                color='primary'
                sx={{ borderRadius: 'var(--border-radius)', height: '40px' }}
                onClick={() => share(handleOpen)}
              >
                <TypoNotoSans text='결과 공유하기' variant='button' textAlign='center' color='white' />
              </Button>
              <Button variant='text' onClick={toGola}>
                <TypoNotoSans text='팀에 참여하기' {...inviteButtonTypoStyle} />
              </Button>
            </div>
          </div>
          <AlertSnackBar open={open} handleClose={handleClose} message='결과 공유 링크가 복사되었습니다!' />
        </div>
        <SwipeableEdgeDrawer isHidden={isShowNotificationPermissionAlert} height='50px' swipeUp={false} showPuller={false}>
          <TypoNotoSans text='이 팀에 대한 결과 알림을 받을까용?' />
          <ProgressButton
            isLoaded={true}
            onClick={() => {
              subscribeButtonHandler(toTrue);
            }}
          >
            확인
          </ProgressButton>
        </SwipeableEdgeDrawer>
      </BaseUI>
    </ErrorBoundary>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const teamId = context.query.teamId as string;

  // try {
  const result = await getResult({ teamId });
  const teamInfo = await getTeamInfo({ teamId });
  return {
    props: { result, teamInfo },
  };
  // } catch (error) {
  //   return {
  //     redirect: {
  //       destination: '/404',
  //       permanent: false,
  //     },
  //   };
  // }
};

export default Page;

const title = '결과 페이지 | 밥풀레이스 🍚';
const description = '생성한 팀 혹은 초대받은 팀의 식당 만족도 조사결과 페이지입니다.';
const inviteButtonTypoStyle = {
  variant: 'button' as const,
  textAlign: 'center' as const,
  fontSize: '0.7rem',
  marginY: '5px',
  color: 'rgba(var(--secondary-foreground-rgba))',
};
