import React from 'react';
import dynamic from 'next/dynamic';
import { Map, MapMarker, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { IconButton } from '@mui/material';
import { TypoNotoSans, Header, Layout } from '@/components';
import { useResult, useCard } from '@/hooks';
import { distanceFormat, directionToSatisfaction } from '@/utils';
import { ReplayRoundedIcon, CloseRoundedIcon, CheckRoundedIcon, StarBorderRoundedIcon } from '@/icons';
import type { Restaurant, API, Direction } from '@/interfaces';
import styles from '@/styles/Gola.module.css';

const title = '식당 만족도 조사 | 골라밥 🍚';
const description = '원하는 식당, 원하지 않는 식당을 표현하세요!';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants }: Props) => {
  const { cardRefs, frontIndex, canRender, afterSwipe, swipeUp, swipeLeft, swipeRight, goBack } = useCard(restaurants);
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const { addResult } = useResult(restaurants, isValidUser, frontIndex);

  if (!restaurants) return <div>loading...</div>;
  return (
    <Layout title={title} description={description}>
      <Header showButtons />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            ({ id, latitude: lat, longitude: lng, name, address, distance }, index) =>
              !loading &&
              canRender(index) && (
                <ForwardRefNoSSRTinderCard
                  key={`gola-card-${id}`}
                  ref={cardRefs[index]}
                  className='swipe'
                  onCardLeftScreen={afterSwipe}
                  preventSwipe={['down']}
                  onSwipe={(direction: Direction) => {
                    addResult({ restaurantId: id, satisfaction: directionToSatisfaction(direction) });
                  }}
                >
                  <div className={styles.card + ' card'}>
                    <Map center={{ lat, lng }} style={mapStyle} level={5}>
                      <MapMarker position={{ lat, lng }} />
                    </Map>
                    <div className={styles.info}>
                      <TypoNotoSans text={name} variant='h6' />
                      <TypoNotoSans text={address} />
                      <TypoNotoSans text={distanceFormat(distance)} variant='caption' />
                    </div>
                  </div>
                </ForwardRefNoSSRTinderCard>
              )
          )}
        </div>
        <div className={styles.card_action_buttons}>
          <IconButton onClick={goBack} className={styles.undo}>
            <ReplayRoundedIcon />
          </IconButton>
          <IconButton onClick={swipeLeft} className={styles.bad}>
            <CloseRoundedIcon />
          </IconButton>
          <IconButton onClick={swipeUp} className={styles.verygood}>
            <StarBorderRoundedIcon />
          </IconButton>
          <IconButton onClick={swipeRight} className={styles.good}>
            <CheckRoundedIcon />
          </IconButton>
        </div>
      </div>
    </Layout>
  );
};

export default Gola;

const NoSSRTinderCard = dynamic(() => import('../../components/TinderCardWrapper'), {
  ssr: false,
});
const ForwardRefNoSSRTinderCard = React.forwardRef<API, any>((props, ref) => <NoSSRTinderCard innerRef={ref} {...props} />);

const mapStyle = { width: '100%', height: '100%', borderRadius: 'var(--border-radius)' };
