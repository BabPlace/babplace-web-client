import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { directionToSatisfaction } from '@/utils';
import type { Direction, API, SatisfactionByRestaurant } from '@/interfaces';
import styles from '@/styles/Card.module.css';

const NoSSRTinderCard = dynamic(() => import('react-tinder-card'), {
  ssr: false,
});

const ForwardRefNoSSRTinderCard = forwardRef<API, any>((props, ref) => <NoSSRTinderCard ref={ref} {...props} />);

type Props = {
  restaurantId: number;
  addResult: (newResult: SatisfactionByRestaurant) => void;
  afterSwipe: () => void;
  children?: React.ReactNode;
  innerRef?: React.Ref<API>;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ restaurantId, addResult, afterSwipe, children, innerRef, ...props }: Props) => {
  const onSwipe = (direction: Direction) => {
    addResult({ restaurantId: restaurantId, satisfaction: directionToSatisfaction(direction) });
  };

  return (
    <ForwardRefNoSSRTinderCard ref={innerRef} className='swipe' onSwipe={onSwipe} onCardLeftScreen={afterSwipe} {...props}>
      <div className={styles.card + ' card'}>{children}</div>
    </ForwardRefNoSSRTinderCard>
  );
};

export default Card;
