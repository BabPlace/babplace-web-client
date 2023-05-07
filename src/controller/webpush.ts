import { GAxiosInstance } from './instance';
import type { SubscribeRequest, SubscribeCheckResponse } from '@/interfaces';

export const addSubscribe = async (subscription: PushSubscription) => {
  const response = await GAxiosInstance.post('/web-push/subscription', subscription);

  return response.data;
};

export const createSubscribe = async ({ teamId, pushEndPoint }: SubscribeRequest) => {
  const response = await GAxiosInstance.post<{}, any, SubscribeRequest>('/push/subscribe', {
    teamId,
    pushEndPoint,
  });
  return response.data;
};

export const checkSubscribe = async ({ teamId, pushEndPoint }: SubscribeRequest) => {
  const response = await GAxiosInstance.post<SubscribeCheckResponse>('/push/checkSubscribe', {
    teamId,
    pushEndPoint,
  });
  return response.data;
};
