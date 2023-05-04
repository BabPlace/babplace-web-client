import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { StaticMap, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { IconButton } from '@mui/material';
import { Header, Loading } from '@/components';
import { BaseUI, FlexRow, TypoNotoSans, Visible } from '@/layouts';
import { useResult, useCard } from '@/hooks';
import { categoryFormat, distanceFormat, directionToSatisfaction, addressSumary } from '@/utils';
import { InfoIcon, ReplayIcon, SatisfiedAltIcon, VerySatisfiedIcon, VeryDissatisfiedIcon, SickIcon } from '@/icons';
import type { Restaurant, API, Direction } from '@/interfaces';
import { throttle } from 'lodash';
import styles from '@/styles/Gola.module.css';

type Props = {
  isValidUser: boolean;
  restaurants: Restaurant[];
};

const Gola = ({ isValidUser, restaurants = [] }: Props) => {
  const { loading } = useInjectKakaoMapApi({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!, libraries: ['services', 'clusterer'] });
  const { cardRefs, frontIndex, canRender, afterSwipe, swipeUp, swipeLeft, swipeRight, swipeDown, goBack } = useCard(restaurants);
  const { addResult, isLoading } = useResult(restaurants, isValidUser, frontIndex);

  const throttledAction = useCallback(
    throttle((callbackFn) => {
      callbackFn();
    }, 800),
    [frontIndex]
  );

  return (
    <BaseUI title={title} description={description}>
      <Header showButtons />
      <div className={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                          console.log('id : ', id, ' / ', direction);
                          addResult({ restaurantId: id, satisfaction: directionToSatisfaction(direction) });
                        }}
                      >
                        <div
                          className={styles.card + ' card'}
                          onMouseDown={(e) => {
                            console.log(e);
                          }}
                        >
                          <StaticMap marker={{ position: { lat, lng } }} center={{ lat, lng }} style={mapStyle} level={4} />
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
                            <TypoNotoSans variant='caption'>{distance === -1 ? address : distanceFormat(distance)}</TypoNotoSans>
                          </div>
                        </div>
                      </ForwardRefNoSSRTinderCard>
                    </div>
                  )
              )}
            </div>
            <Visible visible={frontIndex >= 0} className={styles.card_action_buttons}>
              <IconButton onClick={() => throttledAction(goBack)} className={styles.undo}>
                <ReplayIcon />
              </IconButton>
              <IconButton onClick={() => throttledAction(swipeDown)} className={styles.verybad}>
                <SickIcon />
              </IconButton>
              <IconButton onClick={() => throttledAction(swipeLeft)} className={styles.bad}>
                <VeryDissatisfiedIcon />
              </IconButton>
              <IconButton onClick={() => throttledAction(swipeRight)} className={styles.good}>
                <SatisfiedAltIcon />
              </IconButton>
              <IconButton onClick={() => throttledAction(swipeUp)} className={styles.verygood}>
                <VerySatisfiedIcon />
              </IconButton>
            </Visible>
          </>
        )}
      </div>
    </BaseUI>
  );
};

export default Gola;

const NoSSRTinderCard = dynamic(() => import('./TinderCardWrapper'), {
  ssr: false,
});
const ForwardRefNoSSRTinderCard = React.forwardRef<API, any>((props, ref) => <NoSSRTinderCard innerRef={ref} {...props} />);

const title = '식당 만족도 조사 | 밥풀레이스 🍚';
const description = '원하는 식당, 원하지 않는 식당을 표현하세요!';
const mapStyle = { width: '99.5%', height: '99.5%', borderRadius: 'var(--border-radius)' };
