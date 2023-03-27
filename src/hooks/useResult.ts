import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { url } from '@/utils';
import type { Restaurant, ResultRequest, SatisfactionByRestaurant } from '@/pages/interfaces';
import axios from 'axios';

const useResult = (restaurants: Restaurant[], isValidUser: boolean) => {
  const router = useRouter();
  const [frontIndex, setFrontIndex] = useState(restaurants.length - 1);
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
    if (!isValidUser) return;
    if (restaurants.length !== 0 && restaurants.length === result.restaurantSatisfactions.length) {
      const teamId = router.query.teamId;
      axios.post(url(`/result/${teamId}`), result).then((response) => {
        if (response.status === 200) router.push(`/result/${teamId}`);
        else {
          // TODO: 에러 처리
        }
      });
    }
  }, [result]);

  return { frontIndex, result, afterSwipe, addResult };
};

export default useResult;
