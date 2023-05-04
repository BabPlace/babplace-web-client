import { useLocation } from '@/hooks';
import { ErrorBoundary, Home } from '@/components';
import { LocationContext } from '@/context';

export default function Page() {
  const _location = useLocation();

  return (
    <ErrorBoundary>
      <LocationContext.Provider value={_location}>
        <Home />
      </LocationContext.Provider>
    </ErrorBoundary>
  );
}
