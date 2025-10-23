import {useState, useEffect} from 'react';

type TWindowSize = {
  width: number;
  height: number;
};

export const useWindowSize = (): TWindowSize => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
