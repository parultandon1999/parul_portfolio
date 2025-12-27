import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  defaultTheme: 'light' | 'dark' | 'system';
  scrollBarEnabled: boolean;
  scrollBarColor: string;
  scrollBarLight: string;
  scrollBarDark: string;
  goToTopEnabled: boolean;
  goToTopPosition: 'bottom-right' | 'bottom-left' | 'bottom-center';
  goToTopLight: {
    color: string;
    backgroundColor: string;
    glowColor: string;
  };
  goToTopDark: {
    color: string;
    backgroundColor: string;
    glowColor: string;
  };
  toggleButtonLight: {
    backgroundColor: string;
    iconColor: string;
    hoverBackgroundColor: string;
  };
  toggleButtonDark: {
    backgroundColor: string;
    iconColor: string;
    hoverBackgroundColor: string;
  };
  dotsAnimation: {
    enabled: boolean;
    dotCount: number;
    minSize: number;
    maxSize: number;
    speed: number;
    glowIntensity: number;
    dotsLight: Array<{
      color: string;
      glowColor: string;
      hoverColor: string;
    }>;
    dotsDark: Array<{
      color: string;
      glowColor: string;
      hoverColor: string;
    }>;
  };
}

export interface SiteConfiguration {
  siteName: string;
  siteDescription: string;
  authorName: string;
  authorEmail: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    email: string;
  };
}

export interface AdminPreferences {
  sessionTimeout: number;
  enableTwoFactor: boolean;
  lastPasswordChange: string;
}

export interface SettingsData {
  theme: ThemeSettings;
  siteConfig: SiteConfiguration;
  adminPrefs: AdminPreferences;
}

interface SettingsContextType {
  settingsData: SettingsData;
  updateThemeSettings: (theme: ThemeSettings) => void;
  updateSiteConfiguration: (config: SiteConfiguration) => void;
  updateAdminPreferences: (prefs: AdminPreferences) => void;
  updatePrimaryColor: (color: string) => void;
  updateSecondaryColor: (color: string) => void;
  updateAccentColor: (color: string) => void;
  updateFontFamily: (font: string) => void;
  updateDefaultTheme: (theme: 'light' | 'dark' | 'system') => void;
  updateScrollBarSettings: (enabled: boolean, color: string) => void;
  updateGoToTopSettings: (mode: 'light' | 'dark', color: string, backgroundColor: string, glowColor: string) => void;
  updateToggleButtonSettings: (mode: 'light' | 'dark', backgroundColor: string, iconColor: string, hoverBackgroundColor: string) => void;
  updateGoToTopPosition: (position: 'bottom-right' | 'bottom-left' | 'bottom-center') => void;
  updateGoToTopEnabled: (enabled: boolean) => void;
  updateDotsAnimation: (dotsConfig: typeof defaultThemeSettings.dotsAnimation) => void;
  updateDotStyle: (mode: 'light' | 'dark', index: number, dotStyle: typeof defaultThemeSettings.dotsAnimation.dotsLight[0]) => void;
  addDotStyle: (mode: 'light' | 'dark', dotStyle: typeof defaultThemeSettings.dotsAnimation.dotsLight[0]) => void;
  removeDotStyle: (mode: 'light' | 'dark', index: number) => void;
  resetThemeToDefaults: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_settings';

const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#000000',
  secondaryColor: '#f5f5f5',
  accentColor: '#3b82f6',
  fontFamily: 'system-ui',
  defaultTheme: 'system',
  scrollBarEnabled: true,
  scrollBarColor: '#52434aff',
  scrollBarLight: '#000000ff',
  scrollBarDark: '#ffffffff',
  goToTopEnabled: true,
  goToTopPosition: 'bottom-right',
  goToTopLight: {
    color: '#ec4899',
    backgroundColor: '#fce7f3',
    glowColor: '#fbcfe8',
  },
  goToTopDark: {
    color: '#ec4899',
    backgroundColor: '#831843',
    glowColor: '#be185d',
  },
  toggleButtonLight: {
    backgroundColor: '#f5f5f5',
    iconColor: '#000000',
    hoverBackgroundColor: '#e5e5e5',
  },
  toggleButtonDark: {
    backgroundColor: '#1a1a1a',
    iconColor: '#ffffff',
    hoverBackgroundColor: '#2a2a2a',
  },
  dotsAnimation: {
    enabled: true,
    dotCount: 15,
    minSize: 0.5,
    maxSize: 2,
    speed: 1,
    glowIntensity: 1,
    dotsLight: [
      { color: '#FFB7B2', glowColor: '#FF69B4', hoverColor: '#FF1493' },
      { color: '#FF69B4', glowColor: '#FF1493', hoverColor: '#C71585' },
      { color: '#E6E6FA', glowColor: '#E0B0FF', hoverColor: '#DA70D6' },
      { color: '#F0F8FF', glowColor: '#87CEEB', hoverColor: '#4169E1' },
      { color: '#FFFACD', glowColor: '#FFD700', hoverColor: '#FFA500' },
      { color: '#FFFFFF', glowColor: '#F0F8FF', hoverColor: '#E6E6FA' },
      { color: '#FF1493', glowColor: '#FF69B4', hoverColor: '#FFB6C1' },
      { color: '#E0B0FF', glowColor: '#DA70D6', hoverColor: '#BA55D3' },
    ],
    dotsDark: [
      { color: '#FFB7B2', glowColor: '#FF69B4', hoverColor: '#FF1493' },
      { color: '#FF69B4', glowColor: '#FF1493', hoverColor: '#C71585' },
      { color: '#E6E6FA', glowColor: '#E0B0FF', hoverColor: '#DA70D6' },
      { color: '#F0F8FF', glowColor: '#87CEEB', hoverColor: '#4169E1' },
      { color: '#FFFACD', glowColor: '#FFD700', hoverColor: '#FFA500' },
      { color: '#FFFFFF', glowColor: '#F0F8FF', hoverColor: '#E6E6FA' },
      { color: '#FF1493', glowColor: '#FF69B4', hoverColor: '#FFB6C1' },
      { color: '#E0B0FF', glowColor: '#DA70D6', hoverColor: '#BA55D3' },
    ],
  },
};

const defaultSiteConfig: SiteConfiguration = {
  siteName: 'My Portfolio',
  siteDescription: 'A passionate data scientist and ML engineer',
  authorName: 'Your Name',
  authorEmail: 'your.email@example.com',
  resumeUrl: '',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    email: 'your.email@example.com',
  },
};

const defaultAdminPrefs: AdminPreferences = {
  sessionTimeout: 30,
  enableTwoFactor: false,
  lastPasswordChange: new Date().toISOString(),
};

const defaultSettingsData: SettingsData = {
  theme: defaultThemeSettings,
  siteConfig: defaultSiteConfig,
  adminPrefs: defaultAdminPrefs,
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settingsData, setSettingsData] = useState<SettingsData>(defaultSettingsData);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettingsData(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load settings from storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsData));
  }, [settingsData]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settingsData.theme.primaryColor);
    root.style.setProperty('--color-secondary', settingsData.theme.secondaryColor);
    root.style.setProperty('--color-accent', settingsData.theme.accentColor);
    root.style.setProperty('--font-family', settingsData.theme.fontFamily);
  }, [settingsData.theme]);

  const updateThemeSettings = (theme: ThemeSettings) => {
    setSettingsData({
      ...settingsData,
      theme,
    });
  };

  const updateSiteConfiguration = (config: SiteConfiguration) => {
    setSettingsData({
      ...settingsData,
      siteConfig: config,
    });
  };

  const updateAdminPreferences = (prefs: AdminPreferences) => {
    setSettingsData({
      ...settingsData,
      adminPrefs: prefs,
    });
  };

  const updatePrimaryColor = (color: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        primaryColor: color,
      },
    });
  };

  const updateSecondaryColor = (color: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        secondaryColor: color,
      },
    });
  };

  const updateAccentColor = (color: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        accentColor: color,
      },
    });
  };

  const updateFontFamily = (font: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        fontFamily: font,
      },
    });
  };

  const updateDefaultTheme = (theme: 'light' | 'dark' | 'system') => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        defaultTheme: theme,
      },
    });
  };

  const updateScrollBarSettings = (enabled: boolean, color: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        scrollBarEnabled: enabled,
        scrollBarColor: color,
      },
    });
  };

  const updateGoToTopSettings = (mode: 'light' | 'dark', color: string, backgroundColor: string, glowColor: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        [`goToTop${mode.charAt(0).toUpperCase() + mode.slice(1)}`]: {
          color,
          backgroundColor,
          glowColor,
        },
      },
    });
  };

  const updateToggleButtonSettings = (mode: 'light' | 'dark', backgroundColor: string, iconColor: string, hoverBackgroundColor: string) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        [`toggleButton${mode.charAt(0).toUpperCase() + mode.slice(1)}`]: {
          backgroundColor,
          iconColor,
          hoverBackgroundColor,
        },
      },
    });
  };

  const updateGoToTopPosition = (position: 'bottom-right' | 'bottom-left' | 'bottom-center') => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        goToTopPosition: position,
      },
    });
  };

  const updateGoToTopEnabled = (enabled: boolean) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        goToTopEnabled: enabled,
      },
    });
  };

  const updateDotsAnimation = (dotsConfig: typeof defaultThemeSettings.dotsAnimation) => {
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        dotsAnimation: dotsConfig,
      },
    });
  };

  const updateDotStyle = (mode: 'light' | 'dark', index: number, dotStyle: typeof defaultThemeSettings.dotsAnimation.dotsLight[0]) => {
    const key = `dots${mode.charAt(0).toUpperCase() + mode.slice(1)}` as 'dotsLight' | 'dotsDark';
    const newDots = [...settingsData.theme.dotsAnimation[key]];
    newDots[index] = dotStyle;
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        dotsAnimation: {
          ...settingsData.theme.dotsAnimation,
          [key]: newDots,
        },
      },
    });
  };

  const addDotStyle = (mode: 'light' | 'dark', dotStyle: typeof defaultThemeSettings.dotsAnimation.dotsLight[0]) => {
    const key = `dots${mode.charAt(0).toUpperCase() + mode.slice(1)}` as 'dotsLight' | 'dotsDark';
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        dotsAnimation: {
          ...settingsData.theme.dotsAnimation,
          [key]: [...settingsData.theme.dotsAnimation[key], dotStyle],
        },
      },
    });
  };

  const removeDotStyle = (mode: 'light' | 'dark', index: number) => {
    const key = `dots${mode.charAt(0).toUpperCase() + mode.slice(1)}` as 'dotsLight' | 'dotsDark';
    setSettingsData({
      ...settingsData,
      theme: {
        ...settingsData.theme,
        dotsAnimation: {
          ...settingsData.theme.dotsAnimation,
          [key]: settingsData.theme.dotsAnimation[key].filter((_, i) => i !== index),
        },
      },
    });
  };

  const resetThemeToDefaults = () => {
    setSettingsData({
      ...settingsData,
      theme: defaultThemeSettings,
    });
  };

  const exportData = (): string => {
    return JSON.stringify(settingsData, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.theme && parsed.siteConfig && parsed.adminPrefs) {
        setSettingsData(parsed);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsData,
        updateThemeSettings,
        updateSiteConfiguration,
        updateAdminPreferences,
        updatePrimaryColor,
        updateSecondaryColor,
        updateAccentColor,
        updateFontFamily,
        updateDefaultTheme,
        updateScrollBarSettings,
        updateGoToTopSettings,
        updateToggleButtonSettings,
        updateGoToTopPosition,
        updateGoToTopEnabled,
        updateDotsAnimation,
        updateDotStyle,
        addDotStyle,
        removeDotStyle,
        resetThemeToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
