import React, { Dispatch, SetStateAction, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { directionToSatisfaction } from '@/utils/satisfaction';
import { useTheme } from '@mui/material/styles';
import type { Direction, Restaurant, SatisfactionByRestaurant } from '@/pages/interfaces';
import styled from '@emotion/styled';
import styles from '@/styles/Card.module.css';

type Props = {
  restaurant: Restaurant;
  addResult: (newResult: SatisfactionByRestaurant) => void;
  afterSwipe: () => void;
  children?: React.ReactNode;
};

const Card = ({ restaurant, addResult, afterSwipe, children }: Props) => {
  const theme = useTheme();

  const onSwipe = (direction: Direction) => {
    console.log('You swiped: ' + direction);
    addResult({ restaurantId: restaurant.id, satisfaction: directionToSatisfaction(direction) });
  };

  const onCardLeftScreen = () => {
    afterSwipe();
  };

  return (
    <TinderCard className='swipe' onSwipe={(dir) => onSwipe(dir)} onCardLeftScreen={onCardLeftScreen}>
      <StyledCard className={styles.card + ' card'} bgColor={theme.myPalette[theme.palette.mode].foreground}>
        {children}
      </StyledCard>
    </TinderCard>
  );
};

export default Card;

const StyledCard = styled.div<{ bgColor: string }>`
  box-shadow: 1px 1px 16px 2px ${(props) => props.bgColor + '10'};
`;
