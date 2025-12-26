import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageExit = () => {
  const [isExiting, setIsExiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Trigger exit animation on route change
    setIsExiting(true);
    
    // Reset after animation completes
    const timer = setTimeout(() => {
      setIsExiting(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return isExiting;
};
