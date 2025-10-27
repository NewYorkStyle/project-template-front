import {useState, useEffect} from 'react';

export const useTheme = () => {
  const [theme, setThemeState] = useState<'dark' | 'light'>('light');

  // Инициализация темы при монтировании
  useEffect(() => {
    initializeTheme();

    // Слушаем изменения в других вкладках
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme' && event.newValue) {
        setThemeState(event.newValue as 'dark' | 'light');
        applyTheme(event.newValue as 'dark' | 'light');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    let initialTheme: 'dark' | 'light' = 'light';

    if (savedTheme) {
      initialTheme = savedTheme;
    } else if (systemPrefersDark) {
      initialTheme = 'dark';
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  };

  const applyTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Синхронизация между вкладками
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'theme',
        newValue: newTheme,
      })
    );
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'theme',
        newValue: newTheme,
      })
    );
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};
