import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { useInput, useDrawer } from '@/hooks';
import TypoNotoSans from './TypoNotoSans';
import Input from './Input';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

import Drawer from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export default function SwipeableEdgeDrawer() {
  const theme = useTheme();
  const { drawerRef, open, onFocus } = useDrawer();

  return (
    <StyledDrawer
      ref={drawerRef}
      isOpen={open}
      bgColor={theme.myPalette[theme.palette.mode].background}
      fgColor={theme.myPalette[theme.palette.mode].foreground}
    >
      <div className='drawer-content'>
        <StyledList>
          <StyledListItems>
            <TypoNotoSans className='list-title' text='팀명' textAlign='right' fontSize='0.9rem' />
            <Input onFocus={onFocus}></Input>
          </StyledListItems>
          <StyledListItems>
            <TypoNotoSans className='list-title' text='기준 위치' textAlign='right' fontSize='0.9rem' />
            <Input onFocus={onFocus}></Input>
          </StyledListItems>
          <StyledListItems>
            <TypoNotoSans className='list-title' text='음식점 개수' textAlign='right' fontSize='0.9rem' />
            <Input onFocus={onFocus}></Input>
          </StyledListItems>
          <StyledListItems>
            <TypoNotoSans className='list-title' text='제한 반경' textAlign='right' fontSize='0.9rem' />
            <div className='drawer-buttons list-content'>
              <button>a</button>
              <button>a</button>
              <button>a</button>
              <span className='drawer-buttons-guide'>guide</span>
            </div>
          </StyledListItems>
        </StyledList>
        <Button variant='contained' fullWidth>
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </Button>
      </div>
    </StyledDrawer>
  );
}

const StyledDrawer = styled.div<{ bgColor: string; fgColor: string; isOpen: boolean }>`
  position: fixed;
  padding: var(--drawer-inner-padding-tb) var(--drawer-inner-padding-lr);
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  -webkit-transition: height 0.5s ease;
  -moz-transition: height 0.5s ease;
  -o-transition: height 0.5s ease;
  transition: height 0.5s ease;
  border-radius: 12px 12px 0 0;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fgColor};
  box-shadow: 0 0 10px 0 ${(props) => props.fgColor + '20'};
  height: ${(props) => (props.isOpen ? 'var(--drawer-default-height)' : 'var(--drawer-maximun-height)')};

  .drawer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    height: calc(var(--drawer-default-height) - 2 * var(--drawer-inner-padding-tb));
  }
`;

const StyledList = styled.ul`
  list-style: none;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  li {
    border-bottom: 1px solid #eee;
    padding: 0rem 0rem 0.5rem 0rem;
  }
  li:last-child {
    border-bottom: none;
  }
`;

const StyledListItems = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  .list-title {
    flex: 1 1 0;
  }

  .list-content {
    flex: 2 2 0;
  }
  .drawer-buttons {
    position: relative;
    display: flex;
    justify-content: space-between;

    .drawer-buttons-guide {
      width: 100%;
      position: absolute;
      text-align: center;
      font-size: 0.7rem;
      bottom: -1.2rem;
    }
  }
`;
