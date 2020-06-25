import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    (document as any).querySelector('#scrollable-conainer').scrollTo(0, 0);
  }, [pathname]);

  return null;
}