import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TypoNotoSans } from '@/layouts';
import { ColorModeContext } from '@/pages/_app';

export default function useSwipeableButton() {
  const router = useRouter();
  const colorMode = useContext(ColorModeContext);
  const isShow = router.query.isShow as string;
  const buttons = [
    {
      children: <TypoNotoSans text='❓' variant='caption' fontSize='0.85rem' textAlign='center' />,
      onClick: showGuide,
      className: isShow,
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
      children: <TypoNotoSans text='✨ 코드 기여하기' variant='caption' fontSize='0.75rem' textAlign='center' />,
      onClick: showGithub,
    },
    {
      children: <TypoNotoSans text='🍎 어플리케이션으로 보기' variant='caption' fontSize='0.75rem' textAlign='center' />,
      onClick: openApp,
    },
  ];

  function showGuide() {
    router.push({ pathname: router.asPath.split('?')[0], query: { ...router.query, isShow: 'true' } });
  }

  function openApp() {
    alert('준비중입니다.');
  }

  function showGithub() {
    window.open('https://github.com/Gola-bab/web');
  }

  return { buttons, isShow };
}
