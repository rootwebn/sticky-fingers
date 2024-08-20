'use client';

import { Button } from '@/shared/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const themeHandler = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className={
        'border-silentWhite bg-silentWhite hover:border-white hover:bg-white dark:border-altSpace dark:bg-darkSpace'
      }
      onClick={themeHandler}
    >
      <Sun
        color={'#000000'}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        color={'#ffffff'}
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
