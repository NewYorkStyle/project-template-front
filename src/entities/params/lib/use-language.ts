import {useState, useEffect} from 'react';

import {E_LANGUAGE} from './constants';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<E_LANGUAGE>(E_LANGUAGE.RUS);

  // Инициализация языка при монтировании
  useEffect(() => {
    initializeLanguage();

    // Слушаем изменения в других вкладках
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'language' && event.newValue) {
        setLanguageState(event.newValue as E_LANGUAGE);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    const initialLanguage = savedLanguage || E_LANGUAGE.RUS;

    setLanguageState(initialLanguage as E_LANGUAGE);
    if (!savedLanguage) {
      localStorage.setItem('language', initialLanguage);
    }
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage as E_LANGUAGE);
    localStorage.setItem('language', newLanguage);

    // Синхронизация между вкладками
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'language',
        newValue: newLanguage,
      })
    );
  };

  return {
    language,
    setLanguage,
  };
};
