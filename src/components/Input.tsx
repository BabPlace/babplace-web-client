import React from 'react';
import styled from '@emotion/styled';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  border?: boolean;
  onReturn?: () => void;
};

const Input = ({ onReturn, border = true, ...props }: Props) => {
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onReturn) onReturn();
  }
  return <StyledInput border={border} onKeyDown={onKeyDown} {...props} />;
};

export default Input;

const StyledInput = styled.input<{ border: boolean }>`
  border: none;
  border-bottom: ${(props) => (props.border ? '1px solid rgb(var(--primary-foreground-rgba))' : 'none')};
  background: none;
  font-size: 0.9rem;
`;
