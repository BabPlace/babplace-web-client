import React from 'react';
import dynamic from 'next/dynamic';
import { Map, MapMarker, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { IconButton } from '@mui/material';
import { Header, Layout, Guide } from '@/components';
import { FlexRow, TypoNotoSans } from '@/layouts';
import { useResult, useCard } from '@/hooks';
import { categoryFormat, distanceFormat, directionToSatisfaction } from '@/utils';
import { InfoIcon, ReplayIcon, ErrorIcon, SatisfiedAltIcon, VerySatisfiedIcon, VeryDissatisfiedIcon, SickIcon } from '@/icons';
import type { Restaurant, API, Direction } from '@/interfaces';
import styles from '@/styles/Gola.module.css';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants = [] }: Props) => {
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const { cardRefs, frontIndex, canRender, afterSwipe, swipeUp, swipeLeft, swipeRight, swipeDown, goBack } = useCard(restaurants);
  const { addResult, isLoading } = useResult(restaurants, isValidUser, frontIndex);

  return (
    <Layout title={title} description={description}>
      <Header showButtons />
      <Guide page='gola' />
      <div className={styles.container}>
        <div className={styles.relative}>
          {restaurants.map(
            ({ id, latitude: lat, longitude: lng, name, category, address, distance, restaurantPlaceUrl }, index) =>
              !loading &&
              canRender(index) && (
                <div key={`gola-card-${id}`} style={{ borderRadius: 'var(--border-radius)' }}>
                  <ForwardRefNoSSRTinderCard
                    ref={cardRefs[index]}
                    className='swipe'
                    onCardLeftScreen={afterSwipe}
                    onSwipe={(direction: Direction) => {
                      addResult({ restaurantId: id, satisfaction: directionToSatisfaction(direction) });
                    }}
                  >
                    <div className={styles.card + ' card'}>
                      <Map center={{ lat, lng }} style={mapStyle} level={5}>
                        <MapMarker position={{ lat, lng }} />
                      </Map>
                      <div className={styles.info}>
                        <FlexRow alignItems='center' justifyContent='space-between'>
                          <TypoNotoSans text={name} variant='h6' />
                          <IconButton
                            onTouchStartCapture={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={() => {
                              window.open(restaurantPlaceUrl, '_blank');
                            }}
                            sx={{ padding: '0px' }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </FlexRow>
                        <TypoNotoSans text={categoryFormat(category)} />
                        <TypoNotoSans text={distanceFormat(distance)} variant='caption' />
                      </div>
                    </div>
                  </ForwardRefNoSSRTinderCard>
                </div>
              )
          )}
        </div>
        <div className={styles.card_action_buttons}>
          <IconButton onClick={goBack} className={styles.undo}>
            <ReplayIcon />
          </IconButton>
          <IconButton onClick={swipeDown} className={styles.verybad}>
            <SickIcon />
          </IconButton>
          <IconButton onClick={swipeLeft} className={styles.bad}>
            <VeryDissatisfiedIcon />
          </IconButton>
          <IconButton onClick={swipeRight} className={styles.good}>
            <SatisfiedAltIcon />
          </IconButton>
          <IconButton onClick={swipeUp} className={styles.verygood}>
            <VerySatisfiedIcon />
          </IconButton>
        </div>
      </div>
    </Layout>
  );
};

export default Gola;

const NoSSRTinderCard = dynamic(() => import('./TinderCardWrapper'), {
  ssr: false,
});
const ForwardRefNoSSRTinderCard = React.forwardRef<API, any>((props, ref) => <NoSSRTinderCard innerRef={ref} {...props} />);

const title = '식당 만족도 조사 | 골라밥 🍚';
const description = '원하는 식당, 원하지 않는 식당을 표현하세요!';
const mapStyle = { width: '99.5%', height: '99.5%', borderRadius: 'var(--border-radius)' };
