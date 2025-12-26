import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';

interface AdminAccessMenuProps {
  children: React.ReactNode;
}

const AdminAccessMenu = ({ children }: AdminAccessMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    // Only show hover timer if not authenticated
    if (isAuthenticated) {
      setShowMenu(true);
      return;
    }

    setHoverTime(0);
    hoverTimeoutRef.current = setInterval(() => {
      setHoverTime((prev) => {
        const newTime = prev + 0.1;
        if (newTime >= 5) {
          setShowMenu(true);
          if (hoverTimeoutRef.current) clearInterval(hoverTimeoutRef.current);
          return 5;
        }
        return newTime;
      });
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearInterval(hoverTimeoutRef.current);
    }
    setHoverTime(0);
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.matches(':hover')) {
        setShowMenu(false);
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (login(password)) {
        setPassword('');
        setShowMenu(false);
        navigate('/admin');
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
      setShowMenu(false);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearInterval(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo with hover indicator */}
      <div className="relative">
        {children}

        {/* Hover Progress Bar - Only show if not authenticated */}
        {!isAuthenticated && hoverTime > 0 && hoverTime < 5 && (
          <div
            className="absolute -bottom-1 left-0 h-0.5 bg-foreground rounded-full transition-all"
            style={{ width: `${(hoverTime / 5) * 100}%` }}
          />
        )}
      </div>

      {/* Admin Menu Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-50"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearInterval(hoverTimeoutRef.current);
            }}
            onMouseLeave={() => setShowMenu(false)}
          >
            {isAuthenticated ? (
              // Authenticated view
              <button
                onClick={handleAdminClick}
                className="w-full px-4 py-3 flex items-center gap-3 text-foreground hover:bg-secondary transition-colors"
              >
                <Lock size={16} />
                <span className="font-mono text-sm">Go to Dashboard</span>
              </button>
            ) : (
              // Password input view
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={16} className="text-foreground" />
                  <span className="font-mono text-sm text-foreground">Admin Access</span>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
                  autoFocus
                />

                {error && (
                  <div className="text-xs text-red-600 bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full px-3 py-2 bg-foreground text-background rounded font-mono text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Access'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAccessMenu;
