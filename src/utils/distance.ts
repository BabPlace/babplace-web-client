export default function distanceFormat(meter: number) {
  if (meter < 1000) {
    return `${meter}m`;
  }
  return `${(meter / 1000).toFixed(1)}km`;
}
