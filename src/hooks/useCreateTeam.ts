import { useCallback, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { createTeam } from '@/controller';
import { Errors, ErorrData } from '@/interfaces';
import useQuery from './useQuery';
import { AxiosError } from 'axios';
import { SelectsContext, LocationContext } from '@/context';

export default function useCreateTeam(name: string, limitRestaurant: number, radius: number, limitUser: number) {
  const { location } = useContext(LocationContext);
  const { selects } = useContext(SelectsContext);
  const { isDefault } = useQuery();
  const [isLoaded, setIsLoaded] = useState(true);
  const [errors, setErrors] = useState<Errors>();
  const router = useRouter();

  const onClick = useCallback(async () => {
    setIsLoaded(false);
    try {
      const { teamId } = await createTeam(
        { name, lat: location.latitude, lng: location.longitude, radius, limitRestaurant, limitUser },
        !isDefault ? selects : undefined
      );
      router.push({
        pathname: `gola/${teamId}`,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ErorrData>;
      if (axiosError.response) {
        const {
          name,
          message,
          response: { status, data },
        } = axiosError;
        setErrors({ name, message, status, data });
      }
    }
  }, [isDefault, selects, name, location, radius, limitRestaurant]);

  useEffect(() => {
    if (errors) throw errors;
  }, [errors]);

  return { isLoaded, errors, onClick };
}
