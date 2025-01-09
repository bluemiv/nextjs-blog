'use client';

import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import Icons from '@/components/Icons';

export default function ThemeButton() {
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const curTheme = cookies['theme'] || (isDarkTheme ? 'dark' : 'light');
    setThemeValue(curTheme);
  }, []);

  const setThemeValue = (nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
    setCookie('theme', nextTheme, { path: '/' });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    if (timeoutRef.current) return;
    setIsFadeOut(true);
    timeoutRef.current = setTimeout(() => {
      setThemeValue(theme === 'dark' ? 'light' : 'dark');
      setIsFadeOut(false);
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
    }, 150);
  };

  if (theme === null) return null;
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full hover:bg-background-secondary w-9 h-9 flex items-center justify-center "
    >
      {theme === 'dark' ? (
        <Icons.SunIcon className={isFadeOut ? 'animate-icon-fade-out' : 'animate-icon-fade-in'} />
      ) : (
        <Icons.MoonIcon className={isFadeOut ? 'animate-icon-fade-out' : 'animate-icon-fade-in'} />
      )}
    </button>
  );
}