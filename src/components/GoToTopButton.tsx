import { useEffect, useState, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useTheme } from '@/hooks/useTheme';

export const GoToTopButton = () => {
  const { settingsData } = useSettings();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Don't render if disabled
  if (!settingsData?.theme?.goToTopEnabled) {
    return null;
  }

  // Get the appropriate settings based on current theme
  const isLight = theme === 'light';
  const buttonSettings = isLight ? settingsData.theme.goToTopLight : settingsData.theme.goToTopDark;

  // Safety check for settings
  if (!buttonSettings) {
    return null;
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
      setShouldRender(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );

    // Detect if cursor is within 150px of the button
    if (distance < 150) {
      setIsNear(true);
    } else {
      setIsNear(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle animation end to remove from DOM
    const handleAnimationEnd = () => {
      if (!isVisible) {
        setShouldRender(false);
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      if (button) {
        button.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isVisible]);

  return (
    <>
      {shouldRender && (
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed z-40 group transition-all duration-500 ease-out ${
            settingsData.theme.goToTopPosition === 'bottom-right' ? 'bottom-8 right-8' :
            settingsData.theme.goToTopPosition === 'bottom-left' ? 'bottom-8 left-8' :
            'bottom-8 left-1/2 -translate-x-1/2'
          } ${
            isVisible ? 'animate-slide-in-up' : 'animate-slide-out-down'
          }`}
          aria-label="Go to top"
        >
          {/* Glowing background circle - Theme aware */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500`}
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${buttonSettings.backgroundColor}80, ${buttonSettings.glowColor}60)`
                : isNear
                ? `linear-gradient(135deg, ${buttonSettings.backgroundColor}60, ${buttonSettings.glowColor}40)`
                : `linear-gradient(135deg, ${buttonSettings.backgroundColor}40, ${buttonSettings.glowColor}20)`,
              boxShadow: `0 0 20px ${buttonSettings.glowColor}${isHovered ? '80' : isNear ? '60' : '40'}`,
              transform: isHovered ? 'scale(1.1)' : isNear ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Inner circle with shimmer effect - Theme aware */}
          <div
            className={`absolute inset-1 rounded-full transition-all duration-500`}
            style={{
              background: `linear-gradient(135deg, ${buttonSettings.backgroundColor}, ${buttonSettings.glowColor}40)`,
              opacity: isHovered || isNear ? 0.9 : 0.7,
            }}
          />

          {/* Icon container */}
          <div
            className={`relative flex items-center justify-center w-14 h-14 transition-all duration-500 ${
              isHovered ? 'scale-105' : isNear ? 'scale-102' : 'scale-100'
            }`}
          >
            <ChevronUp
              size={24}
              className={`transition-all duration-500 drop-shadow-lg animate-bounce`}
              style={{
                color: buttonSettings.color,
                opacity: isHovered ? 1 : isNear ? 0.8 : 0.7,
              }}
            />
          </div>

          {/* Floating particles effect on hover or near - Theme aware */}
          {(isHovered || isNear) && (
            <>
              <div
                className="absolute top-0 left-1/2 w-1 h-1 rounded-full animate-float opacity-60"
                style={{ backgroundColor: buttonSettings.color }}
              />
              <div
                className="absolute top-2 right-1 w-1 h-1 rounded-full animate-float opacity-50 animation-delay-100"
                style={{ backgroundColor: buttonSettings.glowColor }}
              />
              <div
                className="absolute bottom-2 left-1 w-1 h-1 rounded-full animate-float opacity-60 animation-delay-200"
                style={{ backgroundColor: buttonSettings.color }}
              />
            </>
          )}
        </button>
      )}
    </>
  );
};
