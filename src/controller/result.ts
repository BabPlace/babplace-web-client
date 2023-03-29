import { GAxiosInstance } from './instance';
import { ResultRequest, ResultResponse, ResultParams } from '@/interfaces';

export const createResult = async ({ teamId, userId, restaurantSatisfactions }: ResultParams & ResultRequest) => {
  const response = await GAxiosInstance.post<ResultResponse>(`/result/${teamId}`, {
    userId,
    restaurantSatisfactions,
  });
  return response.data;
};

export const getResult = async (teamId: string) => {
  const response = await GAxiosInstance.get<ResultResponse>(`/result?teamId=${teamId}`);
  return response.data;
};
