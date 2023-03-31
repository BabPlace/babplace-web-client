import { useEffect, useState } from 'react';

export default function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const bottomBar = document.getElementById('bottombar');
    function handleKeyboardDidShow() {
      if (bottomBar) {
        bottomBar.style.transform = 'translateY(0)';
      }
      setKeyboardVisible(true);
    }

    window.visualViewport?.addEventListener('scroll', handleKeyboardDidShow);
    window.visualViewport?.addEventListener('resize', handleKeyboardDidShow);

    return () => {
      document.removeEventListener('resize', handleKeyboardDidShow);
    };
  }, []);

  return { isKeyboardVisible };
}
