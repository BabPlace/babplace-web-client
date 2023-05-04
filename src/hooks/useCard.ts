import { useState, useMemo, createRef, RefObject, useEffect, useCallback } from 'react';
import type { API, Direction, Restaurant } from '@/interfaces';

export default function useCard(restaurants: Restaurant[] = []) {
  const restaurantLength = restaurants.length;
  const [frontIndex, setFrontIndex] = useState(restaurantLength - 1);

  const canGoBack = frontIndex < restaurantLength - 1;
  const canSwipe = frontIndex >= 0;
  const canRender = useCallback(
    (index: number) => {
      return index === frontIndex || index + 1 === frontIndex;
    },
    [frontIndex]
  );

  const cardRefs: RefObject<API>[] = useMemo(
    () =>
      Array(restaurantLength)
        .fill(0)
        .map(() => createRef()),
    []
  );
  const afterSwipe = () => {
    if (frontIndex >= 0) {
      setFrontIndex(frontIndex - 1);
    }
  };

  const swipe = async (direction: Direction) => {
    if (frontIndex >= 0 && canSwipe && frontIndex < restaurantLength && cardRefs[frontIndex].current) {
      await cardRefs[frontIndex].current?.swipe(direction);
    }
  };

  const swipeUp = () => swipe('down');
  const swipeLeft = () => swipe('left');
  const swipeRight = () => swipe('right');
  const swipeDown = () => swipe('up');

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = frontIndex + 1;
    setFrontIndex(newIndex);
    await cardRefs[frontIndex].current?.restoreCard();
  };

  useEffect(() => {
    if (restaurantLength === 0) {
      throw new Error('No restaurants found');
    }
  }, [restaurantLength]);

  return {
    cardRefs,
    frontIndex,
    canRender,
    afterSwipe,
    swipe,
    goBack,
    swipeUp,
    swipeLeft,
    swipeRight,
    swipeDown,
  };
}
