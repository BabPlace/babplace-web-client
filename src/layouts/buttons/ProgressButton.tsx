import React from 'react';
import RoundButton from './RoundButton';
import { Button, ButtonTypeMap, CircularProgress } from '@mui/material';

type Props = {
  children: React.ReactNode;
  isLoaded?: boolean;
  style?: React.CSSProperties;
} & ButtonTypeMap['props'] &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ProgressButton = ({ children, style, isLoaded = true, ...props }: Props) => {
  return (
    <RoundButton sx={{ ...props.sx, height: 'var(--button-default-height)' }} {...props}>
      {isLoaded ? children : <CircularProgress size={24} sx={{ color: 'rgb(var(--primary-background-rgb))' }} />}
    </RoundButton>
  );
};

export default ProgressButton;
