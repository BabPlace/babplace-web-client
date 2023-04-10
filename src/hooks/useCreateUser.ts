import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUser } from '@/controller';
import { Errors, ErorrData } from '@/interfaces';
import { AxiosError } from 'axios';

export default function useCreateUser(nickName: string) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [errors, setErrors] = useState<Errors>();
  const router = useRouter();

  async function onReturn() {
    setIsLoaded(false);
    const teamId = router.query.teamId as string;
    try {
      const { userId } = await createUser({ teamId, nickName });
      router.push({ pathname: teamId, query: { userId } });
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
      // TODO: 최상위 컴포넌트에서 에러 처리 추가
    }
    // setIsLoaded(true);
  }

  function toResultPage() {
    const teamId = router.query.teamId as string;
    router.push(`/result/${teamId}`);
  }

  useEffect(() => {
    if (errors) {
      throw errors;
    }
  }, [errors]);

  return { isLoaded, errors, onReturn, toResultPage };
}
