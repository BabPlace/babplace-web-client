import { useState } from 'react';

export default function useInput(initialValue = '', maxLength: number = 15) {
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > maxLength) {
      setIsOverLimit(true);
      return;
    }
    setValue(event.target.value);
  };

  const resetOverLimit = () => {
    setIsOverLimit(false);
  };

  const reset = () => {
    setValue('');
  };

  return { value, isOverLimit, handleChange, reset, resetOverLimit };
}
