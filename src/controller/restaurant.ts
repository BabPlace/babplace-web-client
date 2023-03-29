import { GAxiosInstance } from './instance';
import { RestaurantParams, RestaurantResponse } from '@/interfaces';

export const getRestaurant = async ({ userId }: RestaurantParams) => {
  const response = await GAxiosInstance.get<RestaurantResponse>(`/restaurants?userId=${userId}`);
  return response.data;
};
