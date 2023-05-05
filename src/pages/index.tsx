import { useLocation, useWebPush } from '@/hooks';
import { ErrorBoundary, Home } from '@/components';
import { LocationContext } from '@/context';

export default function Page() {
  const _location = useLocation();

  useWebPush();

  return (
    <LocationContext.Provider value={_location}>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </LocationContext.Provider>
  );
}
