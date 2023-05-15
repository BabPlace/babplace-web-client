import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addSubscribe, createSubscribe, checkSubscribe } from '@/controller';

export default function useWebPush() {
  const router = useRouter();
  const [notificationPermission, setNotificationPermission] = useState<typeof Notification.permission>('default');
  const [isRegistered, setIsRegistered] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);

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

  function getTeamId() {
    const teamId = router.query.teamId as string;
    return teamId;
  }

  async function getRegistration() {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      console.log(registration);
      const subscribed = await registration?.pushManager.getSubscription();
      console.log(subscribed);
      return { registration, subscribed };
    } catch (e) {
      return { registration: undefined, subscribed: undefined };
    }
  }

  async function askNotificationPermission() {
    try {
      const result = await Notification.requestPermission();
      console.log('result : ', result);
      setNotificationPermission(result);
    } catch (e) {
      console.log(e);
    }
  }

  async function addSubscription(registration: ServiceWorkerRegistration) {
    const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!VAPID_PUBLIC_KEY) {
      console.log('no KEY');
      return;
    }
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    if (!isRegistered) {
      console.log('ready to add subscribe : ', subscription);
      const result = await addSubscribe(subscription);
      console.log('web-push server result : ', result);
    }
    addSubscriptionToWAS(subscription.endpoint);
  }

  async function addSubscriptionToWAS(pushEndPoint: string) {
    const teamId = getTeamId();
    const result = await createSubscribe({ teamId, pushEndPoint });
    console.log('was result : ', result);
  }

  async function subscribeButtonHandler(callback?: () => void) {
    if (notificationPermission === 'default') askNotificationPermission();
    const { registration } = await getRegistration();
    if (registration) {
      await addSubscription(registration);
    }
    callback && callback();
  }

  // async function unsubscribeButtonHandler() {
  //   const registration = await navigator.serviceWorker.getRegistration();
  //   if (!registration) return;
  //   const subscription = await registration.pushManager.getSubscription();
  //   if (!subscription) return;
  //   fetch('/remove-subscription', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ endpoint: subscription.endpoint }),
  //   });
  //   const unsubscribed = await subscription.unsubscribe();
  //   if (unsubscribed) {
  //     console.info('Successfully unsubscribed from push notifications.');
  //   }
  // }

  async function check() {
    const teamId = getTeamId();
    const { subscribed } = await getRegistration();
    if (!subscribed) {
      console.log('subscribed : ', subscribed);
      setIsSubscribed(false);
      setIsRegistered(false);
      return;
    }
    setIsSubscribed(true);
    const pushEndPoint = subscribed.endpoint;
    const result = await checkSubscribe({ teamId, pushEndPoint });
    console.log(result);
    setIsRegistered(result.subscribe);
  }

  useEffect(() => {
    check();
  }, []);

  return { isRegistered, isSubscribed, notificationPermission, subscribeButtonHandler };
}
