import { RefObject } from 'react';
import type TinderCard from 'react-tinder-card';

export { Errors } from './error';
export type { ErorrData } from './error';

type ExtractGenericFromRefObject<TRefObject> = TRefObject extends RefObject<infer U> ? U : never;

export type Location = {
  latitude: number;
  longitude: number;
};

export type TinderCardProps = Parameters<typeof TinderCard>[0];
export type API = ExtractGenericFromRefObject<TinderCardProps['ref']>;

export type SatisfactionResponse = 'good' | 'bad' | 'veryGood' | 'veryBad';
export type Satisfaction = Uppercase<SatisfactionResponse>;

export type SelectPlace = kakao.maps.services.PlacesSearchResultItem;

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Restaurant = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  restaurantPlaceUrl: string;
  teamcenterLat: number;
  teamcenterLoong: number;
};

export type SatisfactionByRestaurant = {
  restaurantId: number;
  satisfaction: Satisfaction;
};

export type RestaurantSatisfaction = {
  restaurantName: string;
} & {
  [key in SatisfactionResponse]?: string[];
};

export type CategorySatisfaction = {
  tag: string;
  percent: number;
};

// Result
export type ResultParams = {
  teamId: string;
};
export type ResultRequest = {
  userId: number;
  restaurantSatisfactions: SatisfactionByRestaurant[];
};
export type ResultResponse = RestaurantSatisfaction[];
// export type ResultResponse ={
//   // categorySatisfactions: CategorySatisfaction[];
//   restaurantSatisfactions: RestaurantSatisfaction[];
// };

// User
export type UserParams = {
  teamId: string;
};
export type UserRequest = {
  nickName: string;
};
export type UserResponse = {
  userId: string;
};

// Team
export type TeamRequest = {
  name: string;
  radius: number;
  lat: number;
  lng: number;
  limitUser?: number;
  limitRestaurant?: number;
};
export type TeamResponse = {
  teamId: string;
};
export type TeamInfoParams = {
  teamId: string;
};
export type TeamInfoResponse = {
  name: string;
  radius: number;
  limitUser: number;
  limitRestaurant: number;
  latitude: number;
  longitude: number;
};

export type TeamCustomRequest = TeamRequest & {
  restaurantList: SelectPlace[];
};

// Restaurant
export type RestaurantParams = {
  userId: string;
};
export type RestaurantResponse = Restaurant[];

// Web Push

export type SubscribeRequest = {
  teamId: string;
  pushEndPoint: string;
};

export type SubscribeCheckResponse = {
  subscribe: boolean;
};

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S;

type CamelCaseSelectPlace = { [K in keyof SelectPlace as SnakeToCamelCase<K>]: SelectPlace[K] };

export type Recommend = {
  title: string;
  restaurants: CamelCaseSelectPlace[];
};

export type RecommendResponse = {
  recommends: Recommend[];
};

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    like: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    like?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    like: true;
  }
}
