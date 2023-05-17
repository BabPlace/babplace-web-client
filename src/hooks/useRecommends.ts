import { useState, useEffect } from 'react';
import { getRecommends, createTeam } from '@/controller';
import useQuery from './useQuery';
import type { Recommend } from '@/interfaces';

export default function useRecommends() {
  const { drawer } = useQuery();
  const [recommends, setRecommends] = useState<Recommend[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (drawer) {
      getRecommends()
        .then((res) => {
          setRecommends(res.recommends);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } else {
      setRecommends([]);
      setIsLoaded(false);
    }
  }, [drawer]);

  return { recommends, isLoaded };
}
