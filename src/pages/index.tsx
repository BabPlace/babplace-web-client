import { useMainMap, useQuery, useCustom } from '@/hooks';
import { LoadableMap, BabMarker, TeamSettingDrawer, SwipeableButton, Guide, ErrorBoundary, Search } from '@/components';
import { BaseUI, Visible } from '@/layouts';

export default function Home() {
  const { loading, location, addressName, setLocation, onCenterChanged } = useMainMap();
  const { selects, addSelects } = useCustom();
  const { isDefault, drawer } = useQuery();

  const getMapStyle = (drawer: boolean) => {
    if (drawer) {
      return {
        ...mapStyle,
        ...mapHideAnimation,
      };
    }
    return mapStyle;
  };

  return (
    <ErrorBoundary>
      <BaseUI title={title} description={description} bodyStyle={{ marginTop: '0px', backgroundColor: 'black' }}>
        <Guide />
        <LoadableMap
          isLoading={loading}
          center={location}
          style={{ ...getMapStyle(drawer), height: !isDefault ? mapCustomHeight : mapDefaultHeight }}
          onCenterChanged={onCenterChanged}
        />
        <Visible visible={!loading}>
          <BabMarker isCustom={!isDefault} />
        </Visible>
        <SwipeableButton />
        <Search location={location} addSelects={addSelects} setLocation={setLocation} />
        <TeamSettingDrawer isLoading={loading} addressName={addressName} location={location} selectsLength={selects.length} />
      </BaseUI>
    </ErrorBoundary>
  );
}

const title = '골라줘밥 🍚';
const description = '친구들과 함께 오늘 메뉴를 골라골라 🍚';
const mapDefaultHeight = 'calc(var(--max-height) - var(--drawer-default-height) + var(--border-radius))';
const mapCustomHeight = 'calc(var(--max-height) - var(--drawer-default-height) + var(--border-radius) + var(--drawer-list-height) * 2)';
const mapStyle = {
  overflow: 'hidden',
  width: '100%',
  zIndex: 0,
  transformOrigin: 'bottom center',
  transition: 'all 0.35s ease-out, height 0.5s ease-in-out',
};
const mapHideAnimation = {
  transform: 'scale(0.92,  0.92)',
  borderRadius: 'var(--border-radius)',
};
