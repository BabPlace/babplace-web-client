import { useState, useMemo, createRef, RefObject, useEffect } from 'react';
import type { API, Direction, Restaurant } from '@/interfaces';

export default function useCard(restaurants: Restaurant[]) {
  const [frontIndex, setFrontIndex] = useState(restaurants ? restaurants.length - 1 : 0);
  const canGoBack = frontIndex < restaurants.length - 1;
  const canSwipe = frontIndex >= 0;
  const canRender = (index: number) => index === frontIndex || index + 1 === frontIndex;

  const cardRefs: RefObject<API>[] = useMemo(
    () =>
      Array(restaurants.length)
        .fill(0)
        .map(() => createRef()),
    []
  );
  const afterSwipe = () => {
    if (frontIndex > 0) {
      setFrontIndex(frontIndex - 1);
    }
  };

  const swipe = async (direction: Direction) => {
    console.log(direction);
    console.log(frontIndex);
    console.log(cardRefs[frontIndex].current);
    if (canSwipe && frontIndex < restaurants.length && cardRefs[frontIndex].current) {
      await cardRefs[frontIndex].current?.swipe(direction);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = frontIndex + 1;
    setFrontIndex(newIndex);
    await cardRefs[frontIndex].current?.restoreCard();
  };

  useEffect(() => {
    console.log(cardRefs);
  }, [cardRefs]);

  return { cardRefs, frontIndex, canRender, afterSwipe, swipe, goBack };
}
