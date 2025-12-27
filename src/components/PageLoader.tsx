import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Only show on home page
    if (location.pathname !== '/') {
      setIsVisible(false);
      return;
    }

    // Hide loader after page loads
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[9999] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring: Slow rotation, subtle opacity */}
        <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-white/80 animate-[spin_1.5s_linear_infinite]" />
        
        {/* Inner Ring: Faster counter-rotation, accent color (Cyan) */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-b-cyan-400 animate-[spin_1s_linear_infinite_reverse]" />
        
        {/* Core: Gentle pulse */}
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
      </div>
    </div>
  );
};
