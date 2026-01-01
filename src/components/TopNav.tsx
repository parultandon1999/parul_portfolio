import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import AdminPasswordModal from "./AdminPasswordModal";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isOverDark, setIsOverDark] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const checkBackground = () => {
      if (!toggleRef.current) return;
      const rect = toggleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const elements = document.elementsFromPoint(centerX, centerY);
      
      // Check if over footer element
      const isOverFooter = elements.some((el) => {
        if (el === toggleRef.current) return false;
        return el.tagName.toLowerCase() === 'footer' || el.closest('footer') !== null;
      });
      
      setIsOverDark(isOverFooter);
    };

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setTimeout(checkBackground, 10);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('scroll', checkBackground, { passive: true });
    setTimeout(checkBackground, 10);
    checkBackground();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkBackground);
    };
  }, []);

  // 5-second hover handler for admin access
  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      setShowPasswordModal(true);
    }, 5000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleAdminSuccess = () => {
    setShowPasswordModal(false);
    sessionStorage.setItem("admin_authorized", "true");
    navigate("/admin");
  };

  return (
    <>
      {/* Dark mode toggle - top left */}
      <button
        ref={toggleRef}
        onClick={() => setIsDark(!isDark)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-8 left-8 z-50 transition-colors duration-300 ${
          isOverDark 
            ? "text-background hover:text-accent-blue" 
            : "text-foreground hover:text-accent-blue"
        }`}
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
      </button>

      {/* Navigation - top right */}
      <nav className="absolute top-8 right-8 md:right-16 z-50 flex items-center gap-6 md:gap-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 ${
              location.pathname === item.path
                ? "text-accent-blue"
                : "text-foreground hover:text-accent-blue"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Admin Password Modal */}
      <AdminPasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handleAdminSuccess}
      />
    </>
  );
};

export default TopNav;
