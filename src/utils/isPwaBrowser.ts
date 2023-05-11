export default function isPwaBrowser() {
  if (typeof window === undefined) return false;
  try {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-ignore
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }
}
