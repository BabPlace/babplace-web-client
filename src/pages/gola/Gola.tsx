import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Card, TypoNotoSans, Header, Layout } from '@/components';
import { useResult } from '@/hooks';
import { distance } from '@/utils';
import type { Restaurant } from '../../interfaces';
import styled from '@emotion/styled';
import styles from '@/styles/Gola.module.css';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants }: Props) => {
  const { frontIndex, addResult, afterSwipe } = useResult(restaurants, isValidUser);
  if (!restaurants) return <div>loading...</div>;
  return (
    <Layout title='식당 만족도 조사 | 골라밥 🍚' description='원하는 식당, 원하지 않는 식당을 표현하세요!'>
      <Header showButtons={true} />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            (restaurant, index) =>
              (index === frontIndex || index + 1 === frontIndex) && (
                <Card key={restaurant.id} id={restaurant.id} addResult={addResult} afterSwipe={afterSwipe}>
                  <Map
                    center={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                    style={{ width: '100%', height: '100%', borderRadius: 'var(--border-radius)' }}
                  >
                    <MapMarker
                      position={{
                        lat: restaurant.latitude,
                        lng: restaurant.longitude,
                      }}
                    />
                  </Map>
                  <StyledInfo className={styles.info}>
                    <div>
                      <TypoNotoSans variant='h6'>{restaurant.name}</TypoNotoSans>
                      <TypoNotoSans>{restaurant.address}</TypoNotoSans>
                      <TypoNotoSans variant='caption'>{distance(restaurant.distance)}</TypoNotoSans>
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

const StyledInfo = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgb(var(--primary-background-rgb)) 100%);
`;
