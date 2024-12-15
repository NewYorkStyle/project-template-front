import {ThemeChangeView} from './theme-change.view';
import {useEffect, useState} from 'react';

/**
 * Компонент выбора темы.
 */
export const ThemeChange = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme)
      if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        setDarkMode(true);
      } else {
        document.body.removeAttribute('data-theme');
        setDarkMode(false);
      }
  }, []);

  const onChange = () => {
    setDarkMode((prevState) => {
      if (!prevState) document.body.setAttribute('data-theme', 'dark');
      else document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', `${!prevState ? 'dark' : 'light'}`);

      return !prevState;
    });
  };

  return <ThemeChangeView darkMode={darkMode} onChange={onChange} />;
};
