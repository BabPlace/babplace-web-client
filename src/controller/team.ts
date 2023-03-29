import { GAxiosInstance } from './instance';
import { TeamRequest, TeamResponse } from '@/interfaces';

export const createTeam = async ({ name, lat, lng, radius, limitUser = 20, limitRestaurant = 15 }: TeamRequest) => {
  const response = await GAxiosInstance.post<TeamResponse>('/team', {
    name,
    limitUser,
    radius,
    limitRestaurant,
    lat,
    lng,
  });
  return response.data;
};
