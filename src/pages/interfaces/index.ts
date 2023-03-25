export type Restaurant = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  teamcenterLat: number;
  teamcenterLoong: number;
};

export type Satisfaction = 'good' | 'bad' | 'verygood' | 'verybad';

export type SatisfactionByRestaurant = {
  restaurantId: number;
  satisfaction: Satisfaction;
};

export type ResultRequest = {
  userId: number;
  restaurantSatisfactions: SatisfactionByRestaurant[];
};

export type RestaurantSatisfaction = {
  name: string;
} & {
  [key in Satisfaction]?: string[];
};

export type CategorySatisfaction = {
  tag: string;
  percent: number;
};

export type ResultResponse = {
  // categorySatisfactions: CategorySatisfaction[];
  restaurantSatisfactions: RestaurantSatisfaction[];
};

export type Direction = 'up' | 'down' | 'left' | 'right';
