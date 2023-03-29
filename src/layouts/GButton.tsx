import React from 'react';
import { Button, ButtonTypeMap } from '@mui/material';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
} & ButtonTypeMap['props'] &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const GButton = ({ children, style, ...props }: Props) => {
  return (
    <Button variant='contained' fullWidth style={{ height: 'var(--drawer-button-height)', color: 'white', ...style }} {...props}>
      {children}
    </Button>
  );
};

export default GButton;
