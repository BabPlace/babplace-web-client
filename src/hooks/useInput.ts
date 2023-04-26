import { useState, useMemo } from 'react';

type InputValue = string | number;

export default function useInput<T>(initialValue: T, max: number = 15) {
  const [isError, setIsError] = useState({ state: false, message: '' });
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T);
    if (typeof initialValue === 'number') {
      const num = Number(event.target.value);
      if (num < 0 || num > max) {
        setIsError({ state: true, message: `숫자는 0부터 ${max}까지 입력 가능합니다.` });
      } else {
        setIsError((prev) => ({ state: false, message: prev.message }));
      }
    } else if (typeof initialValue === 'string' && event.target.value.length > max) {
      setIsError({ state: true, message: '닉네임이 너무 길어요!' });
    } else {
      setIsError((prev) => ({ state: false, message: prev.message }));
    }
  };

  const valitate = useMemo(() => {
    if (typeof value === 'number') {
      const num = Number(value);
      if (num <= 0 || num > max) {
        setIsError({ state: true, message: `1부터 ${max}까지 입력 가능합니다.` });
        return false;
      }
    } else if (typeof value === 'string') {
      if (value.length > max) {
        setIsError({ state: true, message: `${max}자 이하로 입력해주세요.` });
        return false;
      }
      if (value.length === 0) return false;
    }

    return true;
  }, [value, max]);

  const resetIsError = () => {
    setIsError({ state: false, message: '' });
  };

  const reset = () => {
    setValue(initialValue);
  };

  const setForceValue = (value: T) => {
    setValue(value);
  };

  return { value, isError, handleChange, reset, resetIsError, setForceValue, valitate };
}
