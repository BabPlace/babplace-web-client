import type { SelectPlace } from '@/interfaces';

export default function filterPlace(places: SelectPlace[], value: string) {
  return places.filter((place) => place.place_name.includes(value));
}
