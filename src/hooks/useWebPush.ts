import { useState, useEffect } from 'react';

export default function useWebPush() {
  const [isRegistered, setIsRegistered] = useState(false);

  // isAllowed
  function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function subscribeButtonHandler(callback?: () => void) {
    const result = await Notification.requestPermission();
    if (result === 'denied') {
      console.error('The user explicitly denied the permission request.');
      return;
    }
    if (result === 'granted') {
      console.info('The user accepted the permission request.');
    }
    const registration = await navigator.serviceWorker.getRegistration();
    const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!registration || !VAPID_PUBLIC_KEY) {
      return;
    }
    const subscribed = await registration.pushManager.getSubscription();
    if (subscribed) {
      subscribed.endpoint;
      console.info('User is already subscribed.');
      return;
    }
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    fetch('http://localhost:49644/add-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    callback && callback();
  }

  async function unsubscribeButtonHandler() {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return;
    fetch('/remove-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });
    const unsubscribed = await subscription.unsubscribe();
    if (unsubscribed) {
      console.info('Successfully unsubscribed from push notifications.');
    }
  }

  return { isRegistered, subscribeButtonHandler, unsubscribeButtonHandler };
}
