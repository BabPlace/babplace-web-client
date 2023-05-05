import { useRef, useEffect, useState, useCallback } from 'react';
import type { Location } from '@/interfaces';

const defaultLocation = {
  latitude: 37.566826,
  longitude: 126.9786567,
};

export default function useLocation() {
  const startLocation = useRef<Location>(defaultLocation);
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [isFetch, setIsFetch] = useState(false);

  const getCurrentPosition = () => {
    if (navigator && navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          startLocation.current = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          setIsFetch(true);
        },
        (error) => {
          setIsFetch(true);
        }
      );
  };

  const toCurrentPosition = () => {
    _setLocation(startLocation.current);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  const _setLocation = (location: Location) => {
    setLocation(location);
  };

  return { isFetch, location, setLocation: _setLocation, toCurrentPosition };
}
