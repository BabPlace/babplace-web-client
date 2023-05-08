import { useEffect } from 'react';

export default function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/sw_with_push_manager.js');

        registration.waiting?.postMessage('SKIP_WAITING');
      };
      console.log('sw_with_push_manager.js init');
      registInit();
    } else if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/sw.js');

        registration.waiting?.postMessage('SKIP_WAITING');
      };
      console.log('sw.js init');
      registInit();
    }
  }, []);
}
