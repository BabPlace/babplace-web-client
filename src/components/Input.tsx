import React from 'react';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onReturn?: () => void;
};

const Input = ({ onReturn, ...props }: Props) => {
  const theme = useTheme();

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onReturn) {
      onReturn();
    }
  }

  return <StyledInput borderColor={theme.myPalette[theme.palette.mode].foreground} onKeyDown={onKeyDown} {...props} />;
};

export default Input;

const StyledInput = styled.input<{ borderColor: string }>`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.borderColor};
  background: none;
  border: none;
  font-size: 0.9rem;
`;
