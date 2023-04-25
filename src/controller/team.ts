import { GAxiosInstance } from './instance';
import { TeamInfoParams, TeamInfoResponse, TeamRequest, TeamResponse } from '@/interfaces';
import { snakeToCamel } from '@/utils';
import type { SelectPlace } from '@/interfaces';

export const createTeam = async (teamRequest: TeamRequest, restaurantList?: SelectPlace[]) => {
  if (restaurantList) {
    const camelRestaurantList = restaurantList.map(snakeToCamel);
    const setDistanceToZero = camelRestaurantList.map((r) => ({ ...r, distance: -1 }));
    const response = await GAxiosInstance.post<TeamResponse>('/teamCustom', { ...teamRequest, restaurantList: setDistanceToZero });
    return response.data;
  } else {
    const response = await GAxiosInstance.post<TeamResponse>('/team', teamRequest);
    return response.data;
  }
};

export const getTeamInfo = async ({ teamId }: TeamInfoParams) => {
  const response = await GAxiosInstance.get<TeamInfoResponse>(`/teamInfo?teamId=${teamId}`);
  return response.data;
};
