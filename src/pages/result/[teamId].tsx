import { GetServerSideProps } from 'next';
import { RatioBarChart, Dataset } from '@teamapdan/weirdchart';
import axios from 'axios';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import ResultCard from '@/components/ResultCard';
import ResultDetail from '@/components/ResultDetail';
import { url } from '@/utils/url';
import { useAlert } from '@/hooks';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import styles from '@/styles/Result.module.css';
import type { ResultResponse, RestaurantSatisfaction, Satisfaction } from '../interfaces';

type Props = {
  result?: ResultResponse;
  error?: string | unknown;
};

function Page({ result, error }: Props) {
  const { Alert, open, handleOpen, handleClose } = useAlert();
  const theme = useTheme();

  function makeDataset(restaurantSatisfaction: RestaurantSatisfaction): Dataset[] {
    const dataset: Dataset[] = [];
    const satisfactions: Satisfaction[] = ['good', 'bad', 'verygood', 'verybad'];
    satisfactions.forEach((satisfaction) => {
      if (restaurantSatisfaction[satisfaction] !== undefined) {
        dataset.push({
          label: satisfaction,
          value: restaurantSatisfaction[satisfaction]?.length ?? 0,
          color: theme.myPalette.light[satisfaction],
        });
      }
    });
    return dataset;
  }
  function top3(restaurantSatisfactions: RestaurantSatisfaction[]): RestaurantSatisfaction[] {
    return restaurantSatisfactions.slice(0, 3);
  }
  function others(restaurantSatisfactions: RestaurantSatisfaction[]): RestaurantSatisfaction[] {
    return restaurantSatisfactions.slice(3);
  }

  if (!result || error) {
    return <div>loading...</div>;
  }
  return (
    <Layout title='gola-bab result page' description='gola-bab result page for user'>
      <Header showButtons={true} />
      <StyledDiv
        className={styles.container}
        bgColor={theme.myPalette[theme.palette.mode].background}
        fgColor={theme.myPalette[theme.palette.mode].foreground}
      >
        <h1 className={styles.title}>팀이름 요기</h1>
        <div className={styles.flex}>
          {top3(result.restaurantSatisfactions).map((restaurantSatisfaction, index) => (
            <ResultCard key={restaurantSatisfaction.name} title={restaurantSatisfaction.name} index={index}>
              <div style={{ height: '20px' }}>
                <RatioBarChart
                  dataset={makeDataset(restaurantSatisfaction)}
                  option={{
                    startAnimation: 'fromEqual',
                    barHeight: 20,
                  }}
                />
              </div>
              <ResultDetail restaurantSatisfaction={restaurantSatisfaction} />
            </ResultCard>
          ))}
          <ResultCard title='패배자들...'>
            {others(result.restaurantSatisfactions).map((restaurantSatisfaction) => {
              return (
                <div key={restaurantSatisfaction.name}>
                  <div className={styles.loser} style={{ height: '20px' }}>
                    <Typography className={styles.loser_title} component='div' variant='body2'>
                      {restaurantSatisfaction.name}
                    </Typography>
                    <div className={styles.loser_bar}>
                      <RatioBarChart
                        dataset={makeDataset(restaurantSatisfaction)}
                        option={{
                          startAnimation: 'fromEqual',
                          offsetY: 15,
                          barHeight: 20,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </ResultCard>
          <div className={styles.button_box}>
            <Button variant='contained' fullWidth style={{ borderRadius: '8px', backgroundColor: '#47B8E0' }} onClick={handleOpen}>
              <Typography variant='button' textAlign='center' color='white'>
                결과 공유하기
              </Typography>
            </Button>
            <Typography variant='button' component='div' textAlign='center' marginTop={'10px'} fontSize='0.7rem'>
              앱으로 보기
            </Typography>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
            결과 공유 링크가 복사되었습니다!
          </Alert>
        </Snackbar>
      </StyledDiv>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { teamId } = context.query;
  try {
    const response = await axios<ResultResponse>({ method: 'GET', url: url(`/result?teamId=${teamId}`) });
    const result = response.data;
    return { props: { result } };
  } catch (error) {
    return { props: { error: 'error' } };
  }
};

export default Page;

const StyledDiv = styled.div<{ bgColor: string; fgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fgColor};
`;
