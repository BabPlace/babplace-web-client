import { useMainMap, useQuery } from '@/hooks';
import { Layout, LoadableMap, BabMarker, SwipeableEdgeDrawer, SwipeableButton, Guide, ErrorBoundary, SearchBox } from '@/components';

export default function Home() {
  const { loading, location, addressName, onCenterChanged } = useMainMap();
  const { isCustom } = useQuery();

  return (
    <ErrorBoundary>
      <Layout title={title} description={description} bodyStyle={{ marginTop: '0px' }}>
        <Guide />
        <LoadableMap
          isLoading={loading}
          center={location}
          style={{ ...mapStyle, height: isCustom ? '100svh' : mapDefaultHeight }}
          onCenterChanged={onCenterChanged}
        />
        {!loading && !isCustom && <BabMarker />}
        {!loading && isCustom && <SearchBox location={location} />}
        <SwipeableButton />
        <SwipeableEdgeDrawer isLoading={loading} addressName={addressName} location={location} />
      </Layout>
    </ErrorBoundary>
  );
}

const title = '골라밥 🍚';
const description = '친구들과 함께 오늘 메뉴를 골라골라 🍚';
const mapDefaultHeight = 'calc(var(--max-height) - var(--drawer-default-height) + var(--border-radius) + 7px)';
const mapStyle = {
  overflow: 'hidden',
  width: '100%',
  zIndex: 0,
  transition: ' height 0.5s ease-in-out',
};
