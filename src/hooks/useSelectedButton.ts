import { useState, useMemo } from 'react';

const useSelectedButton = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const onClickButton = (index: number) => {
    setSelectedButton(index);
  };

  const radius = useMemo(() => {
    switch (selectedButton) {
      case 0:
        return 1000;
      case 1:
        return 3000;
      case 2:
        return 5000;
      default:
        return 1000;
    }
  }, [selectedButton]);

  const guideMessage = useMemo(() => {
    switch (selectedButton) {
      case 0:
        return '걸어서 갈 수 있어요!';
      case 1:
        return '자전거 타기 좋은 날?';
      case 2:
        return '버스가 빠를 거에요:)';
      default:
        return '';
    }
  }, [selectedButton]);

  return { selectedButton, radius, guideMessage, onClickButton };
};

export default useSelectedButton;
