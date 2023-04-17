import React from 'react';
import cn from 'classnames';
import { Backdrop } from '@mui/material';
import { FlexColumn } from '@/layouts';
import { SelectPlace } from '@/interfaces';
import { useQuery } from '@/hooks';
import styled from '@emotion/styled';
import styles from '@/styles/Selects.module.css';

type Props = {
  selects: SelectPlace[];
};

const Selects = ({ selects }: Props) => {
  const { isSelects, setQuery } = useQuery();

  return (
    <>
      <Backdrop
        open={isSelects}
        onClick={() => {
          setQuery('mode', 'custom');
        }}
        sx={{ zIndex: 'var(--guide-show-z-index)' }}
      />
      <Container isShow={isSelects} className={cn(styles.container)}>
        <FlexColumn justifyContent='space-between' alignItems='center' height='100%'>
          <div>hi</div>
          <div>hi</div>
          <div>hi</div>
        </FlexColumn>
      </Container>
    </>
  );
};

export default Selects;

const Container = styled.div<{ isShow: boolean }>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  z-index: ${({ isShow }) => (isShow ? 'var(--guide-show-z-index)' : 'var(--guide-hide-z-index)')};
  background: rgb(var(--primary-background-rgb));
  transition: opacity 0.3s 0.3s ease-in-out, visibility 0.3s 0.3s ease-in-out, background, color, border-color 0.5s ease-in-out;
`;
