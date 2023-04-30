import { useEffect, useState, useMemo, useContext } from 'react';
import { TypoNotoSans } from '@/layouts';
import { ColorModeContext } from '@/components';
import { useRouter } from 'next/router';
import useQuery from './useQuery';
import useRecentResult from './useRecentResult';
import { Errors } from '@/interfaces';

type ButtonType = 'guide' | 'theme' | 'mode-pwa' | 'mode-custom' | 'github' | 'result';
type Button = {
  type: ButtonType;
};

export default function useSwipeableButton() {
  const router = useRouter();
  const colorMode = useContext(ColorModeContext);
  const { getRecentResult } = useRecentResult();
  const { isShow, isDefault, isCustom, setQuery } = useQuery();
  const [error, setError] = useState(false);
  const [buttons, setButtons] = useState<Button[]>([]);

  const themeChangeText = useMemo(() => (colorMode.mode === 'light' ? '☀️' : '🌙') + ' 테마 변경하기', [colorMode.mode]);
  const modeChangeText = useMemo(() => (isDefault ? '🍙 직접 추가하기' : '👻 식당 추천받기'), [isDefault]);

  const defaultButtons: Button[] = [
    {
      type: 'guide',
    },
    {
      type: 'mode-custom',
    },

    {
      type: 'theme',
    },
    {
      type: 'github',
    },
  ];

  const pwaButtons: Button = {
    type: 'mode-pwa',
  };
  const resultButtons: Button = {
    type: 'result',
  };

  const buttonsChildren = (type: ButtonType) => {
    switch (type) {
      case 'guide':
        return <TypoNotoSans text='❓' variant='caption' fontSize='0.85rem' textAlign='center' />;
      case 'theme':
        return <TypoNotoSans text={themeChangeText} variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'mode-custom':
        return <TypoNotoSans text={modeChangeText} variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'mode-pwa':
        return <TypoNotoSans text='🍎 앱으로 보기' variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'github':
        return <TypoNotoSans text='🐛 코드 기여하기' variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'result':
        return <TypoNotoSans text='📘 최근 결과보기' variant='caption' fontSize='0.75rem' textAlign='center' />;
    }
  };

  const buttonsAction = (type: ButtonType) => {
    switch (type) {
      case 'guide':
        return showGuide;
      case 'theme':
        return colorMode.toggleColorMode;
      case 'mode-custom':
        return setMode;
      case 'mode-pwa':
        return openApp;
      case 'github':
        return showGithub;
      case 'result':
        return toRecentResultPage;
    }
  };

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
    setQuery('pwa', 'true');
  }

  function showGithub() {
    window.open('https://github.com/BabPlace/babplace-web-client');
  }

  function toRecentResultPage() {
    const teamId = getRecentResult();
    if (!teamId || teamId.length === 0) setError(true);
    else router.push(`/result/${teamId}`);
  }

  useEffect(() => {
    let _buttons: Button[] = [...defaultButtons];
    const teamId = getRecentResult();
    if (teamId.length !== 0) {
      _buttons.splice(1, 0, resultButtons);
    }
    // @ts-ignore
    if (!window.navigator.standalone) {
      _buttons.splice(1, 0, pwaButtons);
    }
    setButtons([..._buttons]);
  }, []);

  return { buttons, buttonsChildren, buttonsAction, isShow, isCustom, isDefault };
}
