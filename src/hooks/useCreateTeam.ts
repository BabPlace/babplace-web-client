import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createTeam } from '@/controller';
import { Errors, ErorrData } from '@/interfaces';
import { AxiosError } from 'axios';

export default function useCreateTeam(name: string, limitRestaurant: number, lat: number, lng: number, radius: number) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [errors, setErrors] = useState<Errors>();
  const router = useRouter();

  async function onClick() {
    setIsLoaded(false);
    try {
      const { teamId } = await createTeam({ name, lat, lng, radius, limitRestaurant });
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
    // setIsLoaded(true);
  }

  useEffect(() => {
    if (errors) throw errors;
  }, [errors]);

  return { isLoaded, errors, onClick };
}
