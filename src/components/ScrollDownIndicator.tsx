import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolled down more than 200px
      setIsVisible(window.scrollY < 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-8 inset-x-0 z-40 animate-bounce transition-opacity duration-500 flex justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollDown}
        className="flex flex-col items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono uppercase tracking-wider"></span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ScrollDownIndicator;
