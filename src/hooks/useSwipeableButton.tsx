import { useContext } from 'react';
import { TypoNotoSans } from '@/layouts';
import { ColorModeContext } from '@/pages/_app';
import useQuery from './useQuery';

export default function useSwipeableButton() {
  const colorMode = useContext(ColorModeContext);
  const { isShow, isDefault, isCustom, setQuery } = useQuery();

  const buttons = [
    {
      children: <TypoNotoSans text='❓' variant='caption' fontSize='0.85rem' textAlign='center' />,
      onClick: showGuide,
      className: isShow.toString(),
    },
    {
      children: (
        <TypoNotoSans
          text={(colorMode.mode === 'light' ? '☀️' : '🌙') + ' 테마 변경하기'}
          variant='caption'
          fontSize='0.75rem'
          textAlign='center'
        />
      ),
      onClick: colorMode.toggleColorMode,
    },
    {
      children: (
        <TypoNotoSans text={isDefault ? '🧩 직접 추가하기' : '💣 랜덤 선택하기'} variant='caption' fontSize='0.75rem' textAlign='center' />
      ),
      onClick: setMode,
    },
    {
      children: <TypoNotoSans text='✨ 코드 기여하기' variant='caption' fontSize='0.75rem' textAlign='center' />,
      onClick: showGithub,
    },
    {
      children: <TypoNotoSans text='🍎 어플리케이션으로 보기' variant='caption' fontSize='0.75rem' textAlign='center' />,
      onClick: openApp,
    },
  ];

  function setMode() {
    if (!isDefault) {
      setQuery('mode');
    } else {
      setQuery('mode', 'custom');
    }
  }

  function showGuide() {
    setQuery('isShow', 'true');
  }

  function openApp() {
    alert('준비중입니다.');
  }

  function showGithub() {
    window.open('https://github.com/Gola-bab/web');
  }

  return { buttons, isShow, isCustom, isDefault };
}
