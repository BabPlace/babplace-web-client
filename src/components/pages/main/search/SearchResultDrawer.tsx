import React from 'react';
import { TypoNotoSans, FlexRow, FlexColumn, SwipeableEdgeDrawer, ProgressButton } from '@/layouts';
import { IconButton, styled } from '@mui/material';
import { IosShareIcon, CloseIcon } from '@/icons';
import { addressSumary } from '@/utils';

type Props = {
  isHidden: boolean;
  selectedSearchResult: any;
  add: () => void;
  share: () => void;
  clear: () => void;
};

const SearchResultDrawer = ({ isHidden, selectedSearchResult, add, share, clear }: Props) => {
  return (
    <SwipeableEdgeDrawer isHidden={isHidden} height={drawerHeight}>
      {/* <SwipeableEdgeDrawer isHidden={false} height={drawerHeight}> */}
      <FlexColumn justifyContent='space-between' height='100%'>
        <FlexRow width='100%' justifyContent='space-between' alignItems='flex-start'>
          <FlexColumn>
            <TypoNotoSans text={selectedSearchResult?.place_name} variant='h5' />
            <TypoNotoSans
              text={addressSumary(selectedSearchResult) + ' 근처'}
              variant='body2'
              color='rgba(var(--secondary-foreground-rgba))'
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
        <ProgressButton onClick={add} {...doneButtonStyle}>
          <TypoNotoSans text='추가하기' variant='button' textAlign='center' color='primary' />
        </ProgressButton>
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
  sx: { height: 'var(--drawer-button-height)', backgroundColor: 'rgb(var(--tertiary-background-rgb))' },
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
