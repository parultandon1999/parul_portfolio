import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSettings } from '@/context/SettingsContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Save, RotateCcw, Download, Upload, Sun, Moon } from 'lucide-react';
import { toast } from "@/lib/toast";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AdminSettings = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { settingsData, updateThemeSettings, updateSiteConfiguration, updateAdminPreferences, resetThemeToDefaults, exportData, importData } = useSettings();

  const [activeTab, setActiveTab] = useState<'theme' | 'site' | 'admin' | 'data'>('theme');
  const [themeForm, setThemeForm] = useState(settingsData.theme);
  const [siteForm, setSiteForm] = useState(settingsData.siteConfig);
  const [adminForm, setAdminForm] = useState(settingsData.adminPrefs);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync form with context data when it changes
  useEffect(() => {
    setThemeForm(settingsData.theme);
    setSiteForm(settingsData.siteConfig);
    setAdminForm(settingsData.adminPrefs);
  }, [settingsData]);

  // Apply theme changes in real-time
  useEffect(() => {
    updateThemeSettings(themeForm);
  }, [themeForm, updateThemeSettings]);

  // Apply site config changes in real-time
  useEffect(() => {
    updateSiteConfiguration(siteForm);
  }, [siteForm, updateSiteConfiguration]);

  // Apply admin prefs changes in real-time
  useEffect(() => {
    updateAdminPreferences(adminForm);
  }, [adminForm, updateAdminPreferences]);

  if (isLoading) return null;
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSaveTheme = () => {
    updateThemeSettings(themeForm);
    toast.success('Theme settings saved successfully!', {
      description: "Your changes have been applied"
    });
  };

  const handleSaveSiteConfig = () => {
    updateSiteConfiguration(siteForm);
    toast.success('Site configuration saved successfully!', {
      description: "Your changes have been applied"
    });
  };

  const handleSaveAdminPrefs = () => {
    updateAdminPreferences(adminForm);
    toast.success('Admin preferences saved successfully!', {
      description: "Your changes have been applied"
    });
  };

  const handleResetTheme = () => {
    if (window.confirm('Are you sure you want to reset theme to defaults?')) {
      resetThemeToDefaults();
      setThemeForm(settingsData.theme);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleExportData = () => {
    const data = exportData();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', 'portfolio-settings-backup.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importData(content)) {
        setSaveSuccess(true);
        setErrorMessage('');
        setTimeout(() => setSaveSuccess(false), 3000);
        // Refresh forms
        setThemeForm(settingsData.theme);
        setSiteForm(settingsData.siteConfig);
        setAdminForm(settingsData.adminPrefs);
      } else {
        setErrorMessage('Failed to import data. Invalid file format.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    };
    reader.readAsText(file);
  };

  const fontOptions = [
    { value: 'system-ui', label: 'System UI (Default)' },
    { value: 'Georgia, serif', label: 'Georgia (Serif)' },
    { value: '"Courier New", monospace', label: 'Courier New (Monospace)' },
    { value: '"Trebuchet MS", sans-serif', label: 'Trebuchet MS (Sans-serif)' },
    { value: '"Arial Black", sans-serif', label: 'Arial Black (Bold)' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>settings
            </h1>
            <p className="text-lg text-muted-foreground mt-4">Configure your portfolio appearance, site info, and preferences</p>
          </div>
        </section>

        {/* Tabs - Updated Styling & Removed Sticky */}
        <section className="py-4 border-b border-border overflow-x-auto bg-background/50">
          <div className="container mx-auto px-6 lg:px-20">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                minWidth: 'max-content',
                '& .MuiTab-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  '&.Mui-selected': {
                    color: 'hsl(var(--foreground))',
                    backgroundColor: 'hsl(var(--secondary))',
                  },
                },
              }}
            >
              <Tab label="Theme" value="theme" />
              <Tab label="Site Config" value="site" />
              <Tab label="Admin" value="admin" />
              <Tab label="Data" value="data" />
            </Tabs>
          </div>
        </section>

        {/* Content - Optimized for density */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 font-mono text-xs flex items-center gap-2">
                ✓ Settings saved successfully
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 font-mono text-xs">
                ✗ {errorMessage}
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                {/* Main Action Buttons */}
                <div className="flex gap-3 mb-6 bg-background/80 backdrop-blur p-2 rounded-lg border border-border shadow-sm">
                  <Button
                    variant="contained"
                    onClick={handleSaveTheme}
                    startIcon={<Save size={14} />}
                    sx={{
                      flex: 1,
                      bgcolor: '#22c55e',
                      color: 'white',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: '#16a34a' }
                    }}
                  >
                    Saved (Auto)
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleResetTheme}
                    startIcon={<RotateCcw size={14} />}
                    sx={{
                      flex: 1,
                      borderColor: 'rgba(239, 68, 68, 0.3)',
                      color: '#dc2626',
                      bgcolor: 'rgba(239, 68, 68, 0.1)',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 0.5)' }
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Color Settings */}
                    <div className="border border-border rounded-lg p-4 bg-secondary/30">
                    <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Colors</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Primary', value: themeForm.primaryColor, key: 'primaryColor', desc: 'Text & main elements' },
                            { label: 'Secondary', value: themeForm.secondaryColor, key: 'secondaryColor', desc: 'Backgrounds' },
                            { label: 'Accent', value: themeForm.accentColor, key: 'accentColor', desc: 'Highlights' }
                        ].map((color) => (
                            <div key={color.key} className="flex items-center gap-3">
                                <div className="relative group">
                                    <input
                                        type="color"
                                        value={color.value}
                                        onChange={(e) => setThemeForm({ ...themeForm, [color.key]: e.target.value })}
                                        className="w-10 h-10 rounded cursor-pointer border border-border p-0 overflow-hidden"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-mono font-bold block">{color.label}</label>
                                    <input
                                        type="text"
                                        value={color.value}
                                        onChange={(e) => setThemeForm({ ...themeForm, [color.key]: e.target.value })}
                                        className="w-full px-2 py-1 bg-transparent border-b border-border text-foreground focus:outline-none focus:border-foreground font-mono text-xs"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Typography & Mode */}
                    <div className="border border-border rounded-lg p-4 bg-secondary/30 space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wider">Typography</h3>
                            <select
                                value={themeForm.fontFamily}
                                onChange={(e) => setThemeForm({ ...themeForm, fontFamily: e.target.value })}
                                className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                            >
                                {fontOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wider">Default Mode</h3>
                            <select
                                value={themeForm.defaultTheme}
                                onChange={(e) => setThemeForm({ ...themeForm, defaultTheme: e.target.value as any })}
                                className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                            >
                                {themeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Scroll Bar */}
                    <div className="border border-border rounded-lg p-4 bg-secondary/30">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Scroll Bar</h3>
                        <input
                            type="checkbox"
                            checked={themeForm.scrollBarEnabled}
                            onChange={(e) => setThemeForm({ ...themeForm, scrollBarEnabled: e.target.checked })}
                            className="w-4 h-4 accent-foreground"
                        />
                    </div>
                    {themeForm.scrollBarEnabled && (
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Light Mode</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={themeForm.scrollBarLight}
                                        onChange={(e) => setThemeForm({ ...themeForm, scrollBarLight: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border border-border"
                                    />
                                    <input
                                        type="text"
                                        value={themeForm.scrollBarLight}
                                        onChange={(e) => setThemeForm({ ...themeForm, scrollBarLight: e.target.value })}
                                        className="flex-1 px-2 py-1 bg-secondary border border-border rounded text-foreground text-xs font-mono"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Dark Mode</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={themeForm.scrollBarDark}
                                        onChange={(e) => setThemeForm({ ...themeForm, scrollBarDark: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border border-border"
                                    />
                                    <input
                                        type="text"
                                        value={themeForm.scrollBarDark}
                                        onChange={(e) => setThemeForm({ ...themeForm, scrollBarDark: e.target.value })}
                                        className="flex-1 px-2 py-1 bg-secondary border border-border rounded text-foreground text-xs font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    </div>

                      {/* Go To Top */}
                    <div className="border border-border rounded-lg p-4 bg-secondary/30">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Top Button</h3>
                            <input
                                type="checkbox"
                                checked={themeForm.goToTopEnabled}
                                onChange={(e) => setThemeForm({ ...themeForm, goToTopEnabled: e.target.checked })}
                                className="w-4 h-4 accent-foreground"
                            />
                        </div>
                         {themeForm.goToTopEnabled && (
                            <select
                                value={themeForm.goToTopPosition}
                                onChange={(e) => setThemeForm({ ...themeForm, goToTopPosition: e.target.value as any })}
                                className="w-full px-3 py-1.5 bg-secondary border border-border rounded text-foreground text-xs"
                            >
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                                <option value="bottom-center">Bottom Center</option>
                            </select>
                        )}
                    </div>
                </div>

                {/* Go To Top Styling (Conditional) */}
                {themeForm.goToTopEnabled && (
                      <div className="border border-border rounded-lg p-4 bg-secondary/30">
                        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Button Styling</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { mode: 'Light', icon: Sun, data: themeForm.goToTopLight, key: 'goToTopLight' },
                                { mode: 'Dark', icon: Moon, data: themeForm.goToTopDark, key: 'goToTopDark' }
                            ].map((item) => (
                                <div key={item.mode} className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><item.icon size={12}/> {item.mode} Mode</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['color', 'backgroundColor', 'glowColor'].map(field => (
                                            <div key={field} className="relative group">
                                                <input
                                                    type="color"
                                                    value={(item.data as any)[field]}
                                                    onChange={(e) => setThemeForm({
                                                        ...themeForm,
                                                        [item.key]: { ...(themeForm as any)[item.key], [field]: e.target.value }
                                                    })}
                                                    className="w-full h-8 rounded border border-border cursor-pointer"
                                                    title={field}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>
                )}
                
                {/* Theme Toggle Styling */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                    <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Toggle Button Style</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { mode: 'Light', icon: Sun, data: themeForm.toggleButtonLight, key: 'toggleButtonLight' },
                            { mode: 'Dark', icon: Moon, data: themeForm.toggleButtonDark, key: 'toggleButtonDark' }
                        ].map((item) => (
                            <div key={item.mode} className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><item.icon size={12}/> {item.mode} Mode</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {['backgroundColor', 'iconColor', 'hoverBackgroundColor'].map(field => (
                                        <div key={field} className="relative">
                                            <input
                                                type="color"
                                                value={(item.data as any)[field]}
                                                onChange={(e) => setThemeForm({
                                                    ...themeForm,
                                                    [item.key]: { ...(themeForm as any)[item.key], [field]: e.target.value }
                                                })}
                                                className="w-full h-8 rounded border border-border cursor-pointer"
                                                title={field}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Animation Settings */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                        Dots Animation
                    </h3>
                    <input
                        type="checkbox"
                        checked={themeForm.dotsAnimation.enabled}
                        onChange={(e) => setThemeForm({
                        ...themeForm,
                        dotsAnimation: { ...themeForm.dotsAnimation, enabled: e.target.checked }
                        })}
                        className="w-4 h-4 accent-foreground"
                    />
                  </div>

                  {themeForm.dotsAnimation.enabled && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {[
                                { label: 'Count', min: 5, max: 50, step: 1, val: themeForm.dotsAnimation.dotCount, key: 'dotCount' },
                                { label: 'Min Size', min: 0.1, max: 5, step: 0.1, val: themeForm.dotsAnimation.minSize, key: 'minSize' },
                                { label: 'Max Size', min: 0.5, max: 10, step: 0.1, val: themeForm.dotsAnimation.maxSize, key: 'maxSize' },
                                { label: 'Speed', min: 0.5, max: 2, step: 0.1, val: themeForm.dotsAnimation.speed, key: 'speed' },
                                { label: 'Glow', min: 0.5, max: 2, step: 0.1, val: themeForm.dotsAnimation.glowIntensity, key: 'glowIntensity' },
                            ].map(slider => (
                                <div key={slider.key}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">{slider.label}</span>
                                        <span className="font-mono">{slider.val}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={slider.min}
                                        max={slider.max}
                                        step={slider.step}
                                        value={slider.val}
                                        onChange={(e) => setThemeForm({
                                            ...themeForm,
                                            dotsAnimation: { ...themeForm.dotsAnimation, [slider.key]: parseFloat(e.target.value) }
                                        })}
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer border border-border"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Colors - Light and Dark Mode */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/50">
                            {[
                                { mode: 'Light', icon: Sun, dots: themeForm.dotsAnimation.dotsLight, key: 'dotsLight' },
                                { mode: 'Dark', icon: Moon, dots: themeForm.dotsAnimation.dotsDark, key: 'dotsDark' }
                            ].map((section) => (
                                <div key={section.key} className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                        <section.icon size={12} />
                                        {section.mode} Mode Dots
                                    </div>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {section.dots.map((dot, index) => (
                                            <div key={index} className="p-3 bg-secondary/50 rounded-lg border-2 border-border/50 space-y-2 hover:border-foreground/30 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-mono text-muted-foreground font-bold">Dot {index + 1}</span>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                const newDots = section.dots.filter((_, i) => i !== index);
                                                                setThemeForm({
                                                                    ...themeForm,
                                                                    dotsAnimation: { ...themeForm.dotsAnimation, [section.key]: newDots }
                                                                });
                                                            }}
                                                            sx={{
                                                                fontSize: '0.75rem',
                                                                bgcolor: 'rgba(239, 68, 68, 0.2)',
                                                                color: '#ef4444',
                                                                borderColor: 'rgba(239, 68, 68, 0.5)',
                                                                textTransform: 'none',
                                                                minWidth: 'auto',
                                                                px: 1,
                                                                py: 0.5,
                                                                borderRadius: '8px',
                                                                fontFamily: 'monospace',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { bgcolor: '#ef4444', color: 'white', borderColor: '#ef4444' }
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize: '0.75rem',
                                                                bgcolor: 'rgba(34, 197, 94, 0.2)',
                                                                color: '#16a34a',
                                                                borderColor: 'rgba(34, 197, 94, 0.5)',
                                                                textTransform: 'none',
                                                                minWidth: 'auto',
                                                                px: 1,
                                                                py: 0.5,
                                                                borderRadius: '8px',
                                                                fontFamily: 'monospace',
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { bgcolor: '#22c55e', color: 'white', borderColor: '#22c55e' }
                                                            }}
                                                        >
                                                            Select
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Color', key: 'color' },
                                                        { label: 'Glow', key: 'glowColor' },
                                                        { label: 'Hover', key: 'hoverColor' }
                                                    ].map((field) => (
                                                        <div key={field.key} className="space-y-1">
                                                            <label className="text-xs font-mono text-muted-foreground block">{field.label}</label>
                                                            <input
                                                                type="color"
                                                                value={(dot as any)[field.key]}
                                                                onChange={(e) => {
                                                                    const newDots = [...section.dots];
                                                                    newDots[index] = { ...dot, [field.key]: e.target.value };
                                                                    setThemeForm({
                                                                        ...themeForm,
                                                                        dotsAnimation: { ...themeForm.dotsAnimation, [section.key]: newDots }
                                                                    });
                                                                }}
                                                                className="w-full h-12 rounded cursor-pointer border-2 border-border p-1"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setThemeForm({
                                                ...themeForm,
                                                dotsAnimation: { 
                                                    ...themeForm.dotsAnimation, 
                                                    [section.key]: [...section.dots, { color: '#FF69B4', glowColor: '#FF1493', hoverColor: '#C71585' }] 
                                                }
                                            });
                                        }}
                                        fullWidth
                                        sx={{
                                            border: '2px dashed hsl(var(--border))',
                                            color: 'hsl(var(--foreground))',
                                            textTransform: 'none',
                                            fontFamily: 'monospace',
                                            bgcolor: 'hsl(var(--secondary))',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                bgcolor: 'hsl(var(--foreground))',
                                                color: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--foreground))'
                                            }
                                        }}
                                    >
                                        + Add Dot Style
                                    </Button>
                                </div>
                            ))}
                        </div>
                      </div>
                  )}
                </div>
              </div>
            )}

            {/* Site Configuration Tab - Compact Grid Layout */}
            {activeTab === 'site' && (
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Site Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Site Name</label>
                      <input
                        type="text"
                        value={siteForm.siteName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                     <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Resume URL</label>
                      <input
                        type="url"
                        value={siteForm.resumeUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteForm({ ...siteForm, resumeUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Site Description</label>
                      <textarea
                        value={siteForm.siteDescription}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSiteForm({ ...siteForm, siteDescription: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Author Name</label>
                      <input
                        type="text"
                        value={siteForm.authorName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteForm({ ...siteForm, authorName: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Author Email</label>
                      <input
                        type="email"
                        value={siteForm.authorEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteForm({ ...siteForm, authorEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(siteForm.socialLinks).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs font-mono text-muted-foreground mb-1.5 capitalize">{key}</label>
                        <input
                          type="url"
                          value={value}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteForm({
                            ...siteForm,
                            socialLinks: { ...siteForm.socialLinks, [key]: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="contained"
                  onClick={handleSaveSiteConfig}
                  startIcon={<Save size={16} />}
                  fullWidth
                  sx={{
                    bgcolor: '#22c55e',
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { bgcolor: '#16a34a' }
                  }}
                >
                  Saved (Auto)
                </Button>
              </div>
            )}

            {/* Admin Preferences Tab */}
            {activeTab === 'admin' && (
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1.5">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={adminForm.sessionTimeout}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdminForm({ ...adminForm, sessionTimeout: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        min="5"
                        max="480"
                      />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-secondary/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={adminForm.enableTwoFactor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdminForm({ ...adminForm, enableTwoFactor: e.target.checked })}
                        className="w-4 h-4 accent-foreground"
                      />
                      <span className="text-sm font-mono">Enable Two-Factor Authentication</span>
                    </label>
                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                        Last Password Change: {new Date(adminForm.lastPasswordChange).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  onClick={handleSaveAdminPrefs}
                  startIcon={<Save size={16} />}
                  fullWidth
                  sx={{
                    bgcolor: '#22c55e',
                    color: 'white',
                    fontFamily: 'monospace',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { bgcolor: '#16a34a' }
                  }}
                >
                  Saved (Auto)
                </Button>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Backup</h3>
                  <p className="text-xs text-muted-foreground mb-4">Export all settings as JSON.</p>
                  <Button
                    variant="contained"
                    onClick={handleExportData}
                    startIcon={<Download size={14} />}
                    fullWidth
                    sx={{
                      bgcolor: '#3b82f6',
                      color: 'white',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: '#2563eb' }
                    }}
                  >
                    Export
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Restore</h3>
                  <p className="text-xs text-muted-foreground mb-4">Import settings from JSON.</p>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<Upload size={14} />}
                    fullWidth
                    sx={{
                      bgcolor: '#a855f7',
                      color: 'white',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { bgcolor: '#9333ea' }
                    }}
                  >
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-4 bg-secondary/30 md:col-span-2">
                  <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wider">Storage Stats</h3>
                  <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div className="p-2 bg-background/50 rounded">
                        <span className="block font-bold mb-1">Size</span>
                        ~{(JSON.stringify(settingsData).length / 1024).toFixed(2)} KB
                    </div>
                      <div className="p-2 bg-background/50 rounded">
                        <span className="block font-bold mb-1">Status</span>
                        Local Storage
                    </div>
                      <div className="p-2 bg-background/50 rounded">
                        <span className="block font-bold mb-1">Backup</span>
                        Pending
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSettings;