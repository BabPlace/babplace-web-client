export default function isPwaBrowser() {
  if (typeof window === undefined) return false;
  // @ts-ignore
  if (window.navigator.standalone) {
    return true;
  }
  return false;
}
