import { useState, useEffect } from 'react';
import { getRecommends, createTeam } from '@/controller';

import type { Recommend } from '@/interfaces';

export default function useRecommends() {
  const [recommends, setRecommends] = useState<Recommend[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (recommends.length !== 0) return;
    getRecommends()
      .then((res) => {
        setRecommends(res.recommends);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return { recommends, isLoaded };
}
