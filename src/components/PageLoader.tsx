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
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center">
      {/* Animated dots */}
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-foreground rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};
