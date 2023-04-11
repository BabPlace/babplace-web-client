import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createResult } from '@/controller';
import type { Restaurant, ResultRequest, SatisfactionByRestaurant } from '@/interfaces';

export default function useResult(restaurants: Restaurant[], isValidUser: boolean, frontIndex: number) {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResultRequest>({ userId: parseInt(userId), restaurantSatisfactions: [] });

  const addResult = (newResult: SatisfactionByRestaurant) => {
    const newRestaurantSatisfactions = result.restaurantSatisfactions.map((restaurantSatisfaction) => {
      if (restaurantSatisfaction.restaurantId === newResult.restaurantId) {
        return newResult;
      }
      return restaurantSatisfaction;
    });
    if (newRestaurantSatisfactions.length === result.restaurantSatisfactions.length) {
      newRestaurantSatisfactions.push(newResult);
    }
    setResult({ ...result, restaurantSatisfactions: newRestaurantSatisfactions });
  };

  useEffect(() => {
    if (!isValidUser || !restaurants) return;
    if (frontIndex === -1) {
      setIsLoading(true);
      const teamId = router.query.teamId as string;
      createResult({ teamId, ...result }).then(() => {
        router.push(`/result/${teamId}`);
      });
    }
  }, [frontIndex, restaurants]);

  return { result, isLoading, addResult };
}
