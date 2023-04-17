import React from 'react';
import {
  RestaurantIcon,
  LocalCafeIcon,
  LocalHospitalIcon,
  SchoolIcon,
  LocalConvenienceStoreIcon,
  LocalGroceryStoreIcon,
  ChildCareIcon,
  KingBedIcon,
  LocalParkingIcon,
  PlaceIcon,
  LocalGasStationIcon,
  SubwayIcon,
  AccountBalanceIcon,
  LandscapeIcon,
  Diversity3Icon,
  LocalPharmacyIcon,
} from '@/icons';

type Props = {
  category:
    | string
    | '대형마트'
    | '편의점'
    | '어린이집, 유치원'
    | '학교'
    | '학원'
    | '주차장'
    | '주유소, 충전소'
    | '지하철역'
    | '은행'
    | '문화시설'
    | '중개업소'
    | '공공기관'
    | '관광명소'
    | '숙박'
    | '음식점'
    | '카페'
    | '병원'
    | '약국';
};

const CategoryIcon = ({ category }: Props) => {
  switch (category) {
    case '대형마트':
      return <LocalGroceryStoreIcon />;
    case '편의점':
      return <LocalConvenienceStoreIcon />;
    case '어린이집, 유치원':
      return <ChildCareIcon />;
    case '학교':
      return <SchoolIcon />;
    case '학원':
      return <SchoolIcon />;
    case '주차장':
      return <LocalParkingIcon />;
    case '주유소, 충전소':
      return <LocalGasStationIcon />;
    case '지하철역':
      return <SubwayIcon />;
    case '은행':
      return <AccountBalanceIcon />;
    case '문화시설':
      return <Diversity3Icon />;
    case '중개업소':
      return <PlaceIcon />;
    case '공공기관':
      return <PlaceIcon />;
    case '관광명소':
      return <LandscapeIcon />;
    case '숙박':
      return <KingBedIcon />;
    case '음식점':
      return <RestaurantIcon />;
    case '카페':
      return <LocalCafeIcon />;
    case '병원':
      return <LocalHospitalIcon />;
    case '약국':
      return <LocalPharmacyIcon />;
    default:
      return <PlaceIcon />;
  }
};

export default CategoryIcon;
