import React from 'react';
import { useMainMap, useQuery } from '@/hooks';
import { BaseUI, FlexRow, TypoNotoSans, Visible } from '@/layouts';
import { LoadableMap, BabMarker, HowToUse, Search, PWAGuide, Selects } from '@/components';
import { MyLocationIcon } from '@/icons';
import SwipeableButton from './SwipeableButton';
import TeamSettingDrawer from './TeamSettingDrawer';
import styles from '@/styles/Home.module.css';

const Home = () => {
  const { loading, addressName, onCenterChanged } = useMainMap();
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
    <BaseUI title={title} description={description} bodyStyle={{ marginTop: '0px', backgroundColor: 'black' }}>
      <Visible visible={!loading}>
        <FlexRow alignItems='center' className={styles.current_position} gap='5px'>
          <MyLocationIcon sx={{ width: '0.9rem' }} color='error' />
          <TypoNotoSans text={addressName} color='#333333' variant='body2' />
        </FlexRow>
      </Visible>
      <LoadableMap
        isLoading={loading}
        level={5}
        style={{ ...getMapStyle(drawer), height: !isDefault ? mapCustomHeight : mapDefaultHeight }}
        onCenterChanged={onCenterChanged}
      />
      <Visible visible={!loading}>
        <BabMarker isCustom={!isDefault} />
      </Visible>
      <SwipeableButton />
      <TeamSettingDrawer isLoading={loading} />
      <Search />
      <Selects />
      <HowToUse />
      <PWAGuide />
    </BaseUI>
  );
};

export default Home;

const title = '밥풀레이스 🍚';
const description = '친구들과 함께 오늘의 밥풀레이스를 뽑아보세요 🍚';
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
  transform: 'scale(0.95,  0.95)',
  borderRadius: 'var(--border-radius)',
};
