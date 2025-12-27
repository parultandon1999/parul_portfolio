import { useEffect, useState, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useTheme } from '@/hooks/useTheme';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

export const GoToTopButton = () => {
  const { settingsData } = useSettings();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
      );

      if (distance < 150) {
        setIsNear(true);
      } else {
        setIsNear(false);
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Determine positioning via SX to handle the different corners/center
  const positionSx = {
    position: 'fixed',
    zIndex: 40,
    bottom: 32,
    ...(settingsData.theme.goToTopPosition === 'bottom-right' && { right: 32 }),
    ...(settingsData.theme.goToTopPosition === 'bottom-left' && { left: 32 }),
    ...(settingsData.theme.goToTopPosition === 'bottom-center' && { left: '50%', transform: 'translateX(-50%)' }),
  };

  return (
    <Zoom in={isVisible}>
      <Box role="presentation" sx={positionSx}>
        <Fab
          ref={buttonRef}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Go to top"
          disableRipple
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            padding: 0,
            overflow: 'visible', // Allows the glow to extend outside the button
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
            },
            transition: 'transform 0.5s ease-out',
          }}
        >
            {/* Glowing background circle */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    transition: 'all 0.5s',
                    background: isHovered
                        ? `linear-gradient(135deg, ${buttonSettings.backgroundColor}80, ${buttonSettings.glowColor}60)`
                        : isNear
                        ? `linear-gradient(135deg, ${buttonSettings.backgroundColor}60, ${buttonSettings.glowColor}40)`
                        : `linear-gradient(135deg, ${buttonSettings.backgroundColor}40, ${buttonSettings.glowColor}20)`,
                    boxShadow: `0 0 20px ${buttonSettings.glowColor}${isHovered ? '80' : isNear ? '60' : '40'}`,
                    transform: isHovered ? 'scale(1.1)' : isNear ? 'scale(1.05)' : 'scale(1)',
                }}
            />

            {/* Inner circle */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: '4px',
                    borderRadius: '50%',
                    transition: 'all 0.5s',
                    background: `linear-gradient(135deg, ${buttonSettings.backgroundColor}, ${buttonSettings.glowColor}40)`,
                    opacity: isHovered || isNear ? 0.9 : 0.7,
                }}
            />

            {/* Icon */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.5s',
                    transform: isHovered ? 'scale(1.05)' : isNear ? 'scale(1.02)' : 'scale(1)',
                    color: buttonSettings.color,
                    opacity: isHovered ? 1 : isNear ? 0.8 : 0.7,
                }}
            >
                <ChevronUp 
                    size={24} 
                    className="animate-bounce" 
                    style={{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))' }} 
                />
            </Box>

            {/* Particles */}
            {(isHovered || isNear) && (
                <>
                    <Box
                        className="animate-float"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: buttonSettings.color,
                            opacity: 0.6,
                        }}
                    />
                    <Box
                        className="animate-float"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 4,
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: buttonSettings.glowColor,
                            opacity: 0.5,
                            animationDelay: '0.1s',
                        }}
                    />
                    <Box
                        className="animate-float"
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 4,
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: buttonSettings.color,
                            opacity: 0.6,
                            animationDelay: '0.2s',
                        }}
                    />
                </>
            )}
        </Fab>
      </Box>
    </Zoom>
  );
};