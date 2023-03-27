import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useTheme } from '@mui/material/styles';
import { distance, url } from '@/utils';
import useResult from '@/hooks/useResult';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import TypoNotoSans from '@/components/TypoNotoSans';
import SetUser from './SetUser';
import type { Restaurant, SatisfactionByRestaurant } from '../interfaces';
import styled from '@emotion/styled';
import styles from '@/styles/Gola.module.css';

const NoSSRCard = dynamic<{
  restaurant: Restaurant;
  addResult: (newResult: SatisfactionByRestaurant) => void;
  afterSwipe: () => void;
  children?: React.ReactNode;
}>(() => import('../../components/Card'), {
  ssr: false,
});

type Props = {
  userId: number;
  restaurants: Restaurant[];
};

function Page({ userId, restaurants }: Props) {
  const isValidUser = userId >= 0;
  const theme = useTheme();
  const { frontIndex, addResult, afterSwipe } = useResult(restaurants, isValidUser);

  if (!isValidUser) {
    return <SetUser />;
  }
  return (
    <Layout title='식당 만족도 조사 | 골라밥 🍚' description='원하는 식당, 원하지 않는 식당을 표현하세요!'>
      <Header showButtons={true} />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            (restaurant, index) =>
              (index === frontIndex || index + 1 === frontIndex) && (
                <NoSSRCard key={restaurant.id} restaurant={restaurant} addResult={addResult} afterSwipe={afterSwipe}>
                  <Map
                    center={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                    style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                    zoomable={false}
                    scrollwheel={false}
                    disableDoubleClick={true}
                  >
                    <MapMarker
                      position={{
                        lat: restaurant.latitude,
                        lng: restaurant.longitude,
                      }}
                    />
                  </Map>
                  <StyledInfo className={styles.info} bgColor={theme.myPalette[theme.palette.mode].background}>
                    <div>
                      <TypoNotoSans variant='h6'>{restaurant.name}</TypoNotoSans>
                      <TypoNotoSans>{restaurant.address}</TypoNotoSans>
                      <TypoNotoSans>{distance(restaurant.distance)}</TypoNotoSans>
                    </div>
                  </StyledInfo>
                </NoSSRCard>
              )
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  const response = await axios<Restaurant[]>({ method: 'GET', url: url(`/restaurants?userId=${userId}`) });
  if (userId && !isNaN(Number(userId))) {
    return {
      props: {
        userId: Number(userId),
        restaurants: response.data,
      },
    };
  }
  return {
    props: {
      userId: -1,
      restaurants: response.data,
    },
  };
};

export default Page;

const StyledInfo = styled.div<{ bgColor: string }>`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, ${(props) => props.bgColor} 100%);
`;
