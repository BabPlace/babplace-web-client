import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Card, TypoNotoSans, Header, Layout } from '@/components';
import { useResult, useCard } from '@/hooks';
import { distanceFormat } from '@/utils';
import type { Restaurant } from '../../interfaces';
import styles from '@/styles/Gola.module.css';

const title = '식당 만족도 조사 | 골라밥 🍚';
const description = '원하는 식당, 원하지 않는 식당을 표현하세요!';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants }: Props) => {
  const { cardRefs, frontIndex, canRender, afterSwipe, swipe, goBack } = useCard(restaurants);
  const { addResult } = useResult(restaurants, isValidUser);

  if (!restaurants) return <div>loading...</div>;
  return (
    <Layout title={title} description={description}>
      <Header showButtons />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            ({ id, latitude: lat, longitude: lng, name, address, distance }, index) => (
              // canRender(index) && (
              <Card innerRef={cardRefs[index]} key={id} restaurantId={id} addResult={addResult} afterSwipe={afterSwipe}>
                <Map center={{ lat, lng }} style={mapStyle}>
                  <MapMarker position={{ lat, lng }} />
                </Map>
                <div className={styles.info}>
                  <div>
                    <TypoNotoSans text={name} variant='h6' />
                    <TypoNotoSans text={address} />
                    <TypoNotoSans text={distanceFormat(distance)} variant='caption' />
                  </div>
                </div>
              </Card>
            )
            // )
          )}
        </div>
        <div className={styles.card_action_buttons}>
          <button className={styles.card_action_button} onClick={() => swipe('left')}>
            <TypoNotoSans variant='caption'>싫어요</TypoNotoSans>
          </button>
          <button className={styles.card_action_button} onClick={() => swipe('right')}>
            <TypoNotoSans variant='caption'>좋아요</TypoNotoSans>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Gola;

const mapStyle = { width: '100%', height: '100%', borderRadius: 'var(--border-radius)' };
