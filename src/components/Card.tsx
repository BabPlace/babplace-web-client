import React, { Dispatch, SetStateAction, useState } from 'react';
import { Restaurant, SatisfactionByRestaurant } from '@/pages/interfaces';
import TinderCard from 'react-tinder-card';
import styles from '@/styles/Card.module.css';
import { directionToSatisfaction } from '@/utils/satisfaction';
import type { Direction } from '@/pages/interfaces';

type Props = {
  restaurant: Restaurant;
  changeInfo: Dispatch<SetStateAction<Restaurant>>;
  change: Dispatch<SetStateAction<boolean>>;
  addResult: (newResult: SatisfactionByRestaurant) => void;
  children?: React.ReactNode;
};

const Card = ({ restaurant, changeInfo, change, addResult, children }: Props) => {
  const [lastDirection, setLastDirection] = useState<Direction>();
  const swiped = (direction: Direction, nameToDelete: any) => {
    change(false);
    changeInfo(restaurant);
    setLastDirection(direction);
    addResult({ restaurantId: restaurant.id, satisfaction: directionToSatisfaction(direction) });
    change(true);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  return (
    <TinderCard
      className='swipe'
      key={restaurant.name}
      onSwipe={(dir) => swiped(dir, restaurant.name)}
      onCardLeftScreen={() => outOfFrame(restaurant.name)}
    >
      <div className={styles.card + ' card'}>
        <div className={styles.contents}>{restaurant.name}</div>
        {children}
      </div>
    </TinderCard>
  );
};

export default Card;
