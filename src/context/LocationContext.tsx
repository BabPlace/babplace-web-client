import { createContext } from 'react';
import type { Location } from '@/interfaces';

const defaultLocation = {
  latitude: 37.566826,
  longitude: 126.9786567,
};

export type LocationContextType = {
  isFetch: boolean;
  location: Location;
  setLocation: (location: Location) => void;
  toCurrentPosition: () => void;
};
export const LocationContext = createContext<LocationContextType>({
  isFetch: false,
  location: defaultLocation,
  setLocation: () => {},
  toCurrentPosition: () => {},
});
