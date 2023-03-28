import { useEffect, useRef, useState } from 'react';

export default function useDrawer() {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  const handleDrawer = (bool: boolean) => {
    setOpen(bool);
  };

  const onFocus = () => {
    handleDrawer(false);
  };

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(target as Node)) {
        handleDrawer(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef]);

  useEffect(() => {
    let touchDownPosition = 0;
    function swipeInMobile({ touches }: TouchEvent) {
      touchDownPosition = touches[0].clientX;
    }
    function swipeOutMobile({ touches }: TouchEvent) {
      console.log(touches);
      if (touchDownPosition - touches[0].clientX > 100) {
        handleDrawer(false);
      }
      if (touchDownPosition - touches[0].clientX < -100) {
        handleDrawer(true);
      }
    }
    if (drawerRef.current) {
      drawerRef.current.addEventListener('touchstart', swipeInMobile);
      drawerRef.current.addEventListener('touchend', swipeOutMobile);
      return () => {
        drawerRef.current?.removeEventListener('touchstart', swipeInMobile);
        drawerRef.current?.removeEventListener('touchend', swipeOutMobile);
      };
    }
  }, [drawerRef]);

  return { drawerRef, open, onFocus, handleDrawer };
}
