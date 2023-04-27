import { useState, useEffect } from 'react';
import type { SelectPlace } from '@/interfaces';

export default function useLike(place: SelectPlace | null) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeItems, setLikeItems] = useState<SelectPlace[]>([]);

  const deleteLike = () => {
    if (!place) return;
    if (typeof window !== 'undefined') {
      const likedPlaces: SelectPlace[] = JSON.parse(localStorage.getItem('likedPlaces') || '[]');
      const newLikedPlaces = likedPlaces.filter((likedPlace) => likedPlace.id !== place.id);
      localStorage.setItem('likedPlaces', JSON.stringify(newLikedPlaces));
      setIsLiked(false);
    }
  };

  const addLike = () => {
    if (!place) return;
    if (isLiked) {
      deleteLike();
      return;
    }
    if (typeof window !== 'undefined') {
      const likedPlaces: SelectPlace[] = JSON.parse(localStorage.getItem('likedPlaces') || '[]');
      likedPlaces.push(place);
      localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
      setIsLiked(true);
    }
  };

  const getLikes = (): SelectPlace[] => {
    if (typeof window !== 'undefined') {
      const likedPlaces: SelectPlace[] = JSON.parse(localStorage.getItem('likedPlaces') || '[]');
      return likedPlaces;
    }
    return [];
  };

  const clearLike = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('likedPlaces');
    }
  };

  useEffect(() => {
    if (!place) return;
    const likedPlaces: SelectPlace[] = getLikes();
    setIsLiked(likedPlaces.some((likedPlace) => likedPlace.id === place.id));
  }, [place]);

  useEffect(() => {
    setLikeItems(getLikes());
  }, []);

  return { likeItems, isLiked, addLike, getLikes, deleteLike, clearLike };
}
