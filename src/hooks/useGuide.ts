import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useGuide(page: string) {
  const router = useRouter();
  const isShow = router.query.isShow as string;
  const [isLoaded, setIsLoaded] = useState(false);

  function show() {
    router.push({ pathname: router.asPath.split('?')[0], query: { ...router.query, isShow: 'true' } });
  }

  function hide() {
    router.push({ pathname: router.asPath.split('?')[0], query: { ...router.query, isShow: 'false' } });
  }

  function doNotShowAgain() {
    localStorage.setItem(`golabab-${page}-guide-hide`, 'true');
    hide();
  }

  useEffect(() => {
    if (isShow === undefined) {
      const isHidden = localStorage.getItem(`golabab-${page}-guide-hide`);
      if (isHidden === 'true') {
        // do Nothing
      } else {
        show();
      }
    }
    setIsLoaded(true);
  }, []);

  return { isShow: isLoaded ? isShow === 'true' : isLoaded, show, hide, doNotShowAgain };
}
