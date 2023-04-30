import { useState, useEffect } from 'react';
import useQuery from './useQuery';

export default function useGuide(page: string) {
  const { isShow, setQuery } = useQuery();
  const [isLoaded, setIsLoaded] = useState(false);

  function show() {
    setQuery('isShow', 'true');
  }

  function hide() {
    setQuery('isShow', 'false');
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
