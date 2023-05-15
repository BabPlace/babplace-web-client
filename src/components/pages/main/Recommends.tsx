import React from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { FlexColumn, FlexRow, TypoNotoSans } from '@/layouts';
import { useRecommends } from '@/hooks';
import { getRandomFoodEmoji } from '@/utils';
import { AddRoundedIcon } from '@/icons';
import styles from '@/styles/Recommends.module.css';

const Recommends = () => {
  const { recommends, isLoaded } = useRecommends();

  return (
    <div className={styles.container}>
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
                <FlexColumn key={`recommend-title-${index}`} gap='2px' className={styles.recommend}>
                  <FlexRow justifyContent='space-between'>
                    <TypoNotoSans variant='h6'>{title}</TypoNotoSans>
                    {/* <IconButton sx={{ padding: '0' }} onClick={() => {}}>
                      <AddRoundedIcon />
                    </IconButton> */}
                  </FlexRow>
                  <FlexRow className={styles.restaurants} gap='10px'>
                    {restaurants.map((restaurant) => {
                      return (
                        <div key={`recommend-restaurant-${restaurant.id}`} className={styles.restaurant}>
                          <TypoNotoSans noWrap={true} overflow='visible' textOverflow=''>
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
    </div>
  );
};

export default Recommends;
