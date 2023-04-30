import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';

export default function useQuery() {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(true);
  const [isSelects, setIsSelects] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isShow, setIsShow] = useState('undefined');
  const [drawer, setDrawer] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const mode = router.query.mode as string;
    setIsDefault(!(mode === 'custom' || mode === 'search' || mode === 'selects' || mode === 'pwa'));
    setIsSelects(mode === 'selects');
    setIsCustom(mode === 'custom' || mode === 'selects');
  }, [router.query.mode]);

  useEffect(() => {
    const search = router.query.search as string;
    setIsSearch(search === 'true');
  }, [router.query.search]);

  useEffect(() => {
    const isShow = router.query.isShow as string;
    setIsShow(isShow);
  }, [router.query.isShow]);

  useEffect(() => {
    const drawer = router.query.drawer as string;
    setDrawer(drawer === 'open');
  }, [router.query.drawer]);

  useEffect(() => {
    const pwa = router.query.pwa as string;
    setIsPWA(pwa === 'true');
  }, [router.query.pwa]);

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

  const toggleMode = useCallback(() => {
    if (isDefault) {
      setQuery('mode', 'custom');
    } else {
      setQuery('mode', 'default');
    }
  }, [isDefault]);

  const toggleSearch = useCallback(() => {
    if (isSearch) {
      setQuery('search');
    } else {
      setQuery('search', 'true');
    }
  }, [isSearch]);

  return { isDefault, isCustom, isShow, isSearch, isSelects, drawer, isPWA, setQuery, toggleMode, toggleSearch };
}
