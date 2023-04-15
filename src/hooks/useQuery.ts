import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function useQuery() {
  const router = useRouter();

  const isCustom = useMemo(() => {
    const mode = router.query.mode as string;
    if (mode === 'custom' || mode === 'customSearch') return true;
    return false;
  }, [router.query]);

  const isShow = useMemo(() => {
    const isShow = router.query.isShow as string;
    return isShow === 'true';
  }, [router.query]);

  function setQuery(key: string, value?: string) {
    const query = { ...router.query };
    if (value === undefined) {
      delete query[key];
    } else {
      query[key] = value;
    }
    router.push({
      pathname: router.asPath.split('?')[0],
      query,
    });
  }

  return { isCustom, isShow, setQuery };
}
