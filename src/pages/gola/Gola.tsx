import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { TypoNotoSans, Header, Layout } from '@/components';
import { useTheme } from '@mui/material/styles';
import { Card } from '@/components';
import { useResult } from '@/hooks';
import { distance } from '@/utils';
import type { Restaurant } from '../interfaces';
import styled from '@emotion/styled';
import styles from '@/styles/Gola.module.css';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants }: Props) => {
  const theme = useTheme();
  const { frontIndex, addResult, afterSwipe } = useResult(restaurants, isValidUser);
  return (
    <Layout title='식당 만족도 조사 | 골라밥 🍚' description='원하는 식당, 원하지 않는 식당을 표현하세요!'>
      <Header showButtons={true} />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            (restaurant, index) =>
              (index === frontIndex || index + 1 === frontIndex) && (
                <Card key={restaurant.id} restaurant={restaurant} addResult={addResult} afterSwipe={afterSwipe}>
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
                </Card>
              )
          )}
        </div>
        <div className={styles.card_action_buttons}></div>
      </div>
    </Layout>
  );
};

export default Gola;

const StyledInfo = styled.div<{ bgColor: string }>`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, ${(props) => props.bgColor} 100%);
`;
