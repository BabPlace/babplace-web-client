import React from 'react';
import { Button, ButtonTypeMap, CircularProgress } from '@mui/material';

type Props = {
  children: React.ReactNode;
  isLoaded?: boolean;
  style?: React.CSSProperties;
} & ButtonTypeMap['props'] &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const ProgressButton = ({ children, style, isLoaded, ...props }: Props) => {
  return (
    <Button sx={{ ...props.sx, height: 'var(--button-default-height)', borderRadius: 'var(--border-radius)' }} {...props}>
      {isLoaded ? children : <CircularProgress size={24} sx={{ color: 'rgb(var(--primary-background-rgb))' }} />}
    </Button>
  );
};

export default ProgressButton;
