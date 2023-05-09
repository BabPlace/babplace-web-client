import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { TypoNotoSans } from '@/layouts';

type Props = {
  className?: string;
  border?: boolean;
  error?: boolean;
  errorText?: string;
  errorSize?: 'small' | 'large';
  textAlign?: string;
  onReturn?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  className,
  border = true,
  error = false,
  errorText = '',
  errorSize = 'large',
  textAlign = 'center',
  onReturn,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onReturn) onReturn();
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <Container border={border} error={error} errorSize={errorSize} className={className} textAlign={textAlign}>
      <input ref={inputRef} onKeyDown={onKeyDown} {...props} className='input' autoFocus />
      <TypoNotoSans
        className={'error-text ' + (error ? 'show' : 'hide')}
        textAlign='center'
        fontSize={errorSize === 'large' ? '0.8rem' : '0.5rem'}
        fontWeight='600'
      >
        {errorText}
      </TypoNotoSans>
    </Container>
  );
};

export default Input;

const Container = styled.div<{ border: boolean; error: boolean; errorSize: 'small' | 'large'; textAlign: string }>`
  width: 100%;
  .input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    border-bottom: ${(props) =>
      props.border
        ? props.error
          ? '1px solid rgb(var(--error-foreground-rgba))'
          : '1px solid rgb(var(--primary-foreground-rgba))'
        : 'none'};

    color: rgba(var(--primary-foreground-rgba));
    text-align: ${({ textAlign }) => textAlign};
    background: none;
    font-size: 1rem;
  }

  .input:focus-visible {
    outline: none;
  }

  .error-text {
    position: absolute;
    left: 50%;
    width: 100%;
    transform: translateX(-50%) ${({ errorSize }) => (errorSize === 'large' ? '' : 'translateY(-4px)')};

    color: rgba(var(--error-foreground-rgba));
    margin-top: ${({ errorSize }) => (errorSize === 'large' ? '5px' : '')};
  }
  .show {
    animation: fadein 0.5s forwards ease-in-out;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  .hide {
    animation: fadeout 0.5s forwards ease-in-out;
    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;
