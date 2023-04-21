import React from 'react';
import { Button, styled, ButtonTypeMap } from '@mui/material';

type Props = ButtonTypeMap['props'] & React.ButtonHTMLAttributes<HTMLButtonElement>;

const RoundButton = ({ children, ...props }: Props) => {
  return <RoudnedButtonStyled {...props}>{children}</RoudnedButtonStyled>;
};

export default RoundButton;

const RoudnedButtonStyled = styled(Button)`
  border-radius: var(--border-radius);
`;
