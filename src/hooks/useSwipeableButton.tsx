import { useEffect, useState, useMemo, useContext } from 'react';
import { TypoNotoSans } from '@/layouts';
import { ColorModeContext } from '@/components';
import useQuery from './useQuery';

type ButtonType = 'guide' | 'theme' | 'mode-pwa' | 'mode-custom' | 'github';
type Button = {
  type: ButtonType;
};

export default function useSwipeableButton() {
  const [buttons, setButtons] = useState<Button[]>([]);
  const colorMode = useContext(ColorModeContext);
  const { isShow, isDefault, isCustom, setQuery } = useQuery();

  const themeChangeText = useMemo(() => (colorMode.mode === 'light' ? '☀️' : '🌙') + ' 테마 변경하기', [colorMode.mode]);
  const modeChangeText = useMemo(() => (isDefault ? '🧩 직접 추가하기' : '💣 식당 추천받기'), [isDefault]);

  const defaultButtons: Button[] = [
    {
      type: 'guide',
    },
    {
      type: 'theme',
    },
    {
      type: 'mode-custom',
    },
    {
      type: 'github',
    },
  ];

  const pwaButtons: Button = {
    type: 'mode-pwa',
  };

  const buttonsChildren = (type: 'guide' | 'theme' | 'mode-pwa' | 'mode-custom' | 'github') => {
    switch (type) {
      case 'guide':
        return <TypoNotoSans text='❓' variant='caption' fontSize='0.85rem' textAlign='center' />;
      case 'theme':
        return <TypoNotoSans text={themeChangeText} variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'mode-custom':
        return <TypoNotoSans text={modeChangeText} variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'mode-pwa':
        return <TypoNotoSans text='🍎 어플리케이션으로 보기' variant='caption' fontSize='0.75rem' textAlign='center' />;
      case 'github':
        return <TypoNotoSans text='✨ 코드 기여하기' variant='caption' fontSize='0.75rem' textAlign='center' />;
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
    setQuery('mode', 'pwa');
  }

  function showGithub() {
    window.open('https://github.com/Gola-bab/web');
  }

  useEffect(() => {
    // @ts-ignore
    if (window.navigator.standalone) {
      setButtons([...defaultButtons]);
    } else {
      const _buttons = [...defaultButtons];
      _buttons.splice(1, 0, pwaButtons);
      setButtons([..._buttons]);
    }
  }, []);

  return { buttons, buttonsChildren, buttonsAction, isShow, isCustom, isDefault };
}
