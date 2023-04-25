import React, { useEffect } from 'react';
import { TypoNotoSans, FlexRow, FlexColumn, SwipeableEdgeDrawer, ProgressButton, Visible } from '@/layouts';
import { IconButton, Typography, styled } from '@mui/material';
import {
  IosShareIcon,
  CloseIcon,
  HeartIcon,
  SatisfiedAltIcon,
  VerySatisfiedIcon,
  VeryDissatisfiedIcon,
  SickIcon,
  HeartFilledIcon,
} from '@/icons';
import { addressSumary, categorySplit } from '@/utils';
import { useQuery, useLike } from '@/hooks';
import type { SelectPlace } from '@/interfaces';

type Props = {
  selectedSearchResult: SelectPlace | null;
  add: () => void;
  share: () => void;
  clear: () => void;
  setForceValue: (value: string) => void;
};

const defaultSelectedSearchResult: SelectPlace = {
  address_name: '서울 용산구 동자동 43-205',
  category_group_code: '',
  category_group_name: '',
  category_name: '교통,수송 \u003e 기차,철도 \u003e 기차역 \u003e KTX정차역',
  distance: '',
  id: '9113903',
  phone: '1544-7788',
  place_name: '서울역',
  place_url: 'http://place.map.kakao.com/9113903',
  road_address_name: '서울 용산구 한강대로 405',
  x: '126.970606917394',
  y: '37.5546788388674',
};

const SearchResultDrawer = ({ selectedSearchResult, add, share, clear, setForceValue }: Props) => {
  const { isCustom } = useQuery();
  const { isLiked, addLike } = useLike(selectedSearchResult);

  useEffect(() => {
    if (isCustom) clear();
  }, [isCustom]);

  return (
    <SwipeableEdgeDrawer isHidden={!isCustom || selectedSearchResult === null} height={drawerHeight} swipeUp={false}>
      {/* <SwipeableEdgeDrawer isHidden={false} height={drawerHeight} swipeUp={false}> */}
      <FlexColumn justifyContent='space-between' height='100%'>
        <FlexRow width='100%' justifyContent='space-between' alignItems='flex-start'>
          <FlexColumn width='80%' gap='3px'>
            <TypoNotoSans text={selectedSearchResult?.place_name} variant='h5' />
            <Visible visible={selectedSearchResult?.category_group_name === '음식점'}>
              <FlexRow gap='10px'>
                {categorySplit(selectedSearchResult?.category_name).map((category, index) => (
                  <div key={`SearchResultDrawer-Category-${index}`} onClick={() => setForceValue(category)}>
                    <TypoNotoSans text={'#' + category} color='rgba(var(--secondary-foreground-rgba))' variant='body2' />
                  </div>
                ))}
              </FlexRow>
            </Visible>
            <TypoNotoSans
              text={addressSumary(selectedSearchResult) + ' 근처'}
              variant='caption'
              color='rgba(var(--tertiary-foreground-rgb))'
            />
          </FlexColumn>
          <FlexRow gap='7px' alignItems='flex-start'>
            <RoundedIconButton size='small' onClick={share}>
              <IosShareIcon {...iconStyle} />
            </RoundedIconButton>
            <RoundedIconButton size='small' onClick={clear}>
              <CloseIcon {...iconStyle} />
            </RoundedIconButton>
          </FlexRow>
        </FlexRow>
        <FlexColumn gap='10px'>
          {selectedSearchResult?.category_group_name === '음식점' ? (
            <FlexColumn gap='5px'>
              <FlexRow alignItems='flex-end'>
                <FlexRow gap='10px' width='100%'>
                  <FlexRow gap='10px' alignItems='flex-end'>
                    <SatisfiedAltIcon sx={{ color: 'rgba(var(--gola-verygood-rgb))' }} fontSize='small' />
                    <Typography fontSize='15px'>{'>'}</Typography>
                  </FlexRow>
                  <FlexRow gap='10px' alignItems='flex-end'>
                    <VerySatisfiedIcon sx={{ color: 'rgba(var(--gola-good-rgb))' }} fontSize='small' />
                    <Typography fontSize='15px'>{'>'}</Typography>
                  </FlexRow>
                  <FlexRow gap='10px' alignItems='flex-end'>
                    <VeryDissatisfiedIcon sx={{ color: 'rgba(var(--gola-bad-rgb))' }} fontSize='small' />
                    <Typography fontSize='15px'>{'>'}</Typography>
                  </FlexRow>
                  <FlexRow gap='10px' alignItems='flex-end'>
                    <SickIcon sx={{ color: 'rgba(var(--gola-verybad-rgb))' }} fontSize='small' />
                  </FlexRow>
                </FlexRow>
              </FlexRow>
            </FlexColumn>
          ) : (
            <ProgressButton
              onClick={() => {
                setForceValue(addressSumary(selectedSearchResult) + ' 맛집');
              }}
              color='neutral'
              {...doneButtonStyle}
            >
              <TypoNotoSans text='주변식당 찾기' variant='button' textAlign='center' />
            </ProgressButton>
          )}
          <FlexRow gap='7px'>
            <ProgressButton onClick={add} color='primary' {...doneButtonStyle}>
              <TypoNotoSans text='추가하기' variant='button' textAlign='center' />
            </ProgressButton>
            <ProgressButton
              onClick={addLike}
              color='like'
              variant='contained'
              sx={{ minWidth: 'var(--button-default-height)', padding: '0' }}
            >
              {isLiked ? <HeartFilledIcon /> : <HeartIcon />}
            </ProgressButton>
          </FlexRow>
        </FlexColumn>
      </FlexColumn>
    </SwipeableEdgeDrawer>
  );
};

export default SearchResultDrawer;

const drawerHeight =
  'calc(var(--drawer-list-height) * 2 + var(--drawer-list-button-gap) + var(--drawer-button-height) + var(--drawer-inner-padding-tb))';
const doneButtonStyle = {
  variant: 'contained' as const,
  fullWidth: true,
};

const RoundedIconButton = styled(IconButton)`
  && {
    border-radius: 50%;
    background: rgb(var(--tertiary-background-rgb));
    color: rgb(var(--tertiary-foreground-rgb));
  }
`;
const iconStyle = {
  fontSize: 'small' as const,
  sx: { width: '17px', height: '17px' },
};
