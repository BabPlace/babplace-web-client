import { GetServerSideProps } from 'next';
import { RatioBarChart } from '@teamapdan/weirdchart';
import { TypoNotoSans, Layout, Header } from '@/components';
import ResultCard from './ResultCard';
import ResultDetail from './ResultDetail';
import { sliceByOffset, makeDataset } from '@/utils';
import { useAlert } from '@/hooks';
import { useTheme } from '@mui/material/styles';
import { getResult } from '@/controller';
import { Button, Snackbar } from '@mui/material';
import { ResultResponse } from '@/interfaces';
import styles from '@/styles/Result.module.css';

const title = '결과 페이지 | 골라밥 🍚';
const description = '생성한 팀 혹은 초대받은 팀의 식당 만족도 조사결과 페이지입니다.';

type Props = {
  result: ResultResponse;
  error?: string | unknown;
};

function Page({ result: satisfactions, error }: Props) {
  const theme = useTheme();
  const { Alert, open, handleOpen, handleClose } = useAlert();
  const [top3, others] = sliceByOffset(satisfactions, 3);

  function handleShareResultButtonClick() {
    handleOpen();
    navigator.clipboard.writeText(window.location.href);
  }

  if (!satisfactions || error) {
    return <div>loading...</div>;
  }
  return (
    <Layout title={title} description={description}>
      <Header showButtons={true} />
      <div className={styles.container}>
        <TypoNotoSans text='팀이름 요기' variant='h6' textAlign='center' marginBottom='20px' />
        <div className={styles.flex}>
          {top3.map((satisfaction, index) => (
            <ResultCard key={`top3-${satisfaction.restaurantName}-${index}`} title={satisfaction.restaurantName} index={index}>
              <div style={{ height: '20px' }}>
                <RatioBarChart
                  dataset={makeDataset(satisfaction, theme)}
                  option={{
                    startAnimation: 'fromEqual',
                    barHeight: 25,
                  }}
                />
              </div>
              <ResultDetail satisfaction={satisfaction} />
            </ResultCard>
          ))}
          <ResultCard title='패배자들...'>
            <div className={styles.losers}>
              {others.map((satisfaction, index) => {
                return (
                  <div key={`others-${satisfaction.restaurantName}-${index}`} className={styles.loser}>
                    <TypoNotoSans text={satisfaction.restaurantName} variant='caption' className={styles.loser__title} />
                    <div className={styles.loser__bar}>
                      <RatioBarChart
                        dataset={makeDataset(satisfaction, theme)}
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
          <div className={styles.button_box}>
            <Button
              variant='contained'
              fullWidth
              style={{ borderRadius: 'var(--border-radius)', backgroundColor: 'rgb(var(--gola-verygood-rgb))' }}
              onClick={handleShareResultButtonClick}
            >
              <TypoNotoSans text='결과 공유하기' variant='button' textAlign='center' color='white' />
            </Button>
            {/* <TypoNotoSans text='앱으로 보기' variant='button' textAlign='center' marginTop={'10px'} fontSize='0.7rem' /> */}
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
            결과 공유 링크가 복사되었습니다!
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const teamId = context.query.teamId as string;

  const response = await getResult(teamId);
  return {
    props: {
      result: response,
    },
  };
};

export default Page;
