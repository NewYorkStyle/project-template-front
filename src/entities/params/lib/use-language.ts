import {useState, useEffect} from 'react';

export const useLanguage = () => {
  const [language, setLanguageState] = useState('ru');

  // Инициализация языка при монтировании
  useEffect(() => {
    initializeLanguage();

    // Слушаем изменения в других вкладках
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'language' && event.newValue) {
        setLanguageState(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    const initialLanguage = savedLanguage || 'ru';

    setLanguageState(initialLanguage);
    if (!savedLanguage) {
      localStorage.setItem('language', initialLanguage);
    }
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
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
