import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AdminAccessMenu from './AdminAccessMenu';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAVBAR_BLUR = {
    enabled: true,

    scroll: {
      blur: 1,
      saturation: 10,
      opacity: 0.1,
    },

    mobile: {
      blur: 1,
      saturation: 10,
      opacity: 0.1,
    },
  };

  const isBlurActive = NAVBAR_BLUR.enabled && (scrolled || mobileMenuOpen);
  const activeBlur = mobileMenuOpen ? NAVBAR_BLUR.mobile : NAVBAR_BLUR.scroll;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '#home', isAnchor: true },
    { href: '/projects', label: '#projects', isAnchor: false },
    { href: '/skills', label: '#skills', isAnchor: false },
    { href: '/about', label: '#about', isAnchor: false },
    { href: '/contact', label: '#contact', isAnchor: false },
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        backgroundColor: isBlurActive
          ? `hsl(var(--background) / ${activeBlur.opacity})`
          : 'transparent',

        backdropFilter: isBlurActive
          ? `blur(${activeBlur.blur}px) saturate(${activeBlur.saturation}%)`
          : 'none',

        WebkitBackdropFilter: isBlurActive
          ? `blur(${activeBlur.blur}px) saturate(${activeBlur.saturation}%)`
          : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid hsl(var(--border))' : 'none',
        transition: 'all 0.3s ease-in-out',
        color: 'hsl(var(--foreground))',
        backgroundImage: 'none', // Resets default MUI gradient
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 8 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: '64px', md: '80px' } }}>
          
          {/* Logo Section */}
          <AdminAccessMenu>
            <Box 
              component="a" 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': { opacity: 0.9 }
              }}
            >
              <Box component="span" sx={{ fontFamily: 'monospace', color: 'hsl(var(--muted-foreground))', fontSize: { xs: '0.875rem', sm: '1rem' } }}>&lt;</Box>
              <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>DS</Box>
              <Box component="span" sx={{ fontFamily: 'monospace', color: 'hsl(var(--muted-foreground))', fontSize: { xs: '0.875rem', sm: '1rem' } }}>/&gt;</Box>
            </Box>
          </AdminAccessMenu>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                sx={{
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: 'hsl(var(--foreground))',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'transparent',
                    color: 'hsl(var(--foreground))' 
                  },
                  transition: 'opacity 0.2s',
                  minWidth: 'auto',
                  padding: 0,
                }}
              >
                {link.label}
              </Button>
            ))}
            <Box sx={{ ml: 1 }}>
              <ThemeToggle />
            </Box>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: 'hsl(var(--foreground))' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu Collapse */}
      <Collapse in={mobileMenuOpen} timeout="auto" unmountOnExit>
        <Box 
            sx={{ 
                bgcolor: 'hsl(var(--background))', 
                borderTop: '1px solid hsl(var(--border))',
                px: 2,
                pb: 2
            }}
        >
            <List>
                {navLinks.map((link) => (
                    <ListItem key={link.href} disablePadding>
                        <ListItemButton 
                            component="a" 
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            sx={{
                                borderRadius: 1,
                                '&:hover': { backgroundColor: 'hsl(var(--secondary))' }
                            }}
                        >
                            <ListItemText 
                                primary={link.label} 
                                primaryTypographyProps={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    color: 'hsl(var(--muted-foreground))',
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
      </Collapse>
    </AppBar>
  );
};

export default Navigation;