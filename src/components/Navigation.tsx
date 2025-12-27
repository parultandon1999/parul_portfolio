import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import AdminAccessMenu from './AdminAccessMenu';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/30 backdrop-blur-sm border-b border-border' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <AdminAccessMenu>
          <a href="/" className="font-mono text-lg sm:text-xl font-bold flex items-center gap-1 sm:gap-2">
            <span className="text-muted-foreground text-sm sm:text-base">&lt;</span>
            <span className="text-foreground text-sm sm:text-base">DS</span>
            <span className="text-muted-foreground text-sm sm:text-base">/&gt;</span>
          </a>
        </AdminAccessMenu>

        <div className="hidden md:flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-mono text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
