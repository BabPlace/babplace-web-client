import React from 'react';
import { ErrorIcon } from '@/icons';
import { TypoNotoSans } from '@/layouts';

type Props = {
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ErrorMessage = ({ message, ...props }: Props) => {
  return (
    <div>
      <ErrorIcon />
      <TypoNotoSans text={message} />
    </div>
  );
};

export default ErrorMessage;
