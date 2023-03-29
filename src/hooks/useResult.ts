import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createResult } from '@/controller';
import type { Restaurant, ResultRequest, SatisfactionByRestaurant } from '@/interfaces';

export default function useResult(restaurants: Restaurant[], isValidUser: boolean) {
  const router = useRouter();
  const [frontIndex, setFrontIndex] = useState(restaurants ? restaurants.length - 1 : 0);
  const [result, setResult] = useState<ResultRequest>({ userId: -1, restaurantSatisfactions: [] });

  const afterSwipe = () => {
    if (frontIndex > 0) {
      setFrontIndex(frontIndex - 1);
    }
  };

  const addResult = (newResult: SatisfactionByRestaurant) => {
    setResult({ ...result, restaurantSatisfactions: [...result.restaurantSatisfactions, newResult] });
  };

  useEffect(() => {
    if (!isValidUser || !restaurants) return;
    if (restaurants.length !== 0 && restaurants.length === result.restaurantSatisfactions.length) {
      const teamId = router.query.teamId as string;
      createResult({ teamId, ...result }).then(() => {
        router.push(`/result/${teamId}`);
      });
    }
  }, [result, restaurants]);

  return { frontIndex, result, afterSwipe, addResult };
}
