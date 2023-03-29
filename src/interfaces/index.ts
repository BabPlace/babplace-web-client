export type Satisfaction = 'good' | 'bad' | 'verygood' | 'verybad';
export type Direction = 'up' | 'down' | 'left' | 'right';
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

export type SatisfactionByRestaurant = {
  restaurantId: number;
  satisfaction: Satisfaction;
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

// Result
export type ResultParams = {
  teamId: string;
};
export type ResultRequest = {
  userId: number;
  restaurantSatisfactions: SatisfactionByRestaurant[];
};
export type ResultResponse = {
  // categorySatisfactions: CategorySatisfaction[];
  restaurantSatisfactions: RestaurantSatisfaction[];
};

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

// Restaurant
export type RestaurantParams = {
  userId: string;
};
export type RestaurantResponse = Restaurant[];
