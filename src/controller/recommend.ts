import { GAxiosInstance } from './instance';
import { RecommendResponse } from '@/interfaces';

export const getRecommends = async () => {
  const response = await GAxiosInstance.get<RecommendResponse>(`/recommend/restaurants?y=&x=`);
  return response.data;
};
