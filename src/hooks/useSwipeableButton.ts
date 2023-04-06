import { useState } from 'react';

export default function useSwipeableButton() {
  const [isShowGuide, setIsShowGuide] = useState(false);

  const buttons = [
    {
      label: '?', // 가이드 표시
      onClick: showGuide,
    },
    {
      label: '조금 긴 메세진', // 어플리케이션으로 보기
      onClick: openApp,
    },
    {
      label: '엄청나게 길고길고길고 긴 메뉴', // 어플리케이션으로 보기
      onClick: openApp,
    },
    {
      label: 'Can be English?', // 어플리케이션으로 보기
      onClick: openApp,
    },
  ];

  function showGuide() {
    setIsShowGuide(true);
  }

  function hideGuide() {
    setIsShowGuide(false);
  }

  function openApp() {
    alert('준비중입니다.');
  }

  return { buttons, isShowGuide, hideGuide };
}
