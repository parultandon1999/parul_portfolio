import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AdminAccessMenu from './AdminAccessMenu';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <AdminAccessMenu>
          <Link to="/" className="font-mono text-xl font-bold flex items-center gap-2">
            <span className="text-muted-foreground">&lt;</span>
            <span className="text-foreground">DataScientist</span>
            <span className="text-muted-foreground">/&gt;</span>
          </Link>
        </AdminAccessMenu>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-foreground p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
