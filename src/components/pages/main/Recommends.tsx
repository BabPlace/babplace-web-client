import React from 'react';
import { CircularProgress } from '@mui/material';
import { FlexColumn, FlexRow, TypoNotoSans, Visible } from '@/layouts';
import { useRecommends, useQuery } from '@/hooks';
import { getRandomFoodEmoji } from '@/utils';
import styles from '@/styles/Recommends.module.css';

const Recommends = () => {
  const { drawer } = useQuery();
  const { recommends, isLoaded } = useRecommends();

  return (
    <Visible
      visible={drawer}
      className={styles.container}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
    >
      <TypoNotoSans variant='body2' textAlign='center' marginY='30px' color='rgb(var(--tertiary-foreground-rgb))' noWrap={false}>
        밥풀레이스에서 엄선한 식당을 살펴보세요!
      </TypoNotoSans>
      {isLoaded ? (
        recommends?.length === 0 ? (
          <TypoNotoSans>추천 목록이 없어요! 잠시 기다려주세요</TypoNotoSans>
        ) : (
          <FlexColumn gap='23px'>
            {recommends.map(({ title, restaurants }, index) => {
              return (
                <FlexColumn key={`recommend-title-${index}`} gap='5px' className={styles.recommend}>
                  <FlexRow justifyContent='space-between'>
                    <TypoNotoSans fontSize='1.1rem'>{title}</TypoNotoSans>
                    {/* <IconButton sx={{ padding: '0' }} onClick={() => {}}>
                      <AddRoundedIcon />
                    </IconButton> */}
                  </FlexRow>
                  <FlexRow className={styles.restaurants} gap='10px'>
                    {restaurants.map((restaurant) => {
                      return (
                        <div key={`recommend-restaurant-${restaurant.id}`} className={styles.restaurant}>
                          <TypoNotoSans noWrap={true} overflow='visible' textOverflow='' fontSize='0.8rem'>
                            {getRandomFoodEmoji() + restaurant.placeName}
                          </TypoNotoSans>
                        </div>
                      );
                    })}
                  </FlexRow>
                </FlexColumn>
              );
            })}
          </FlexColumn>
        )
      ) : (
        <CircularProgress />
      )}
    </Visible>
  );
};

export default Recommends;
