import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useSettings } from '@/context/SettingsContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { settingsData } = useSettings();

  const isLight = theme === 'light';
  const buttonSettings = isLight ? settingsData?.theme?.toggleButtonLight : settingsData?.theme?.toggleButtonDark;

  // Safety check for settings
  if (!buttonSettings) {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-secondary transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors duration-200"
      style={{
        backgroundColor: buttonSettings.backgroundColor,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = buttonSettings.hoverBackgroundColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = buttonSettings.backgroundColor;
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" style={{ color: buttonSettings.iconColor }} />
      ) : (
        <Moon className="w-5 h-5" style={{ color: buttonSettings.iconColor }} />
      )}
    </button>
  );
};

export default ThemeToggle;
