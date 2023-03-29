import { useEffect, useState } from 'react';

export default function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    function handleKeyboardDidShow(event: UIEvent) {
      console.log(event);
      setKeyboardVisible(true);
    }
    document.addEventListener('resize', handleKeyboardDidShow);

    return () => {
      document.removeEventListener('resize', handleKeyboardDidShow);
    };
  }, []);

  return { isKeyboardVisible };
}
