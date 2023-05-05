import { useLocation } from '@/hooks';
import { ErrorBoundary, Home } from '@/components';
import { LocationContext } from '@/context';

export default function Page() {
  const _location = useLocation();

  return (
    <LocationContext.Provider value={_location}>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </LocationContext.Provider>
  );
}
