import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createResult } from '@/controller';
import type { Restaurant, ResultRequest, SatisfactionByRestaurant } from '@/interfaces';

export default function useResult(restaurants: Restaurant[], isValidUser: boolean, frontIndex: number) {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [result, setResult] = useState<ResultRequest>({ userId: parseInt(userId), restaurantSatisfactions: [] });

  const addResult = (newResult: SatisfactionByRestaurant) => {
    if (result.restaurantSatisfactions.some((r) => r.restaurantId === newResult.restaurantId)) return;
    setResult({ ...result, restaurantSatisfactions: [...result.restaurantSatisfactions, newResult] });
  };

  useEffect(() => {
    if (!isValidUser || !restaurants) return;
    if (frontIndex === -1) {
      const teamId = router.query.teamId as string;
      createResult({ teamId, ...result }).then(() => {
        router.push(`/result/${teamId}`);
      });
    }
  }, [frontIndex, restaurants]);

  return { result, addResult };
}
