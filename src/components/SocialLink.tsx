import { useEffect, useState, useRef } from "react";

interface SocialLinkProps {
  label: string;
  href: string;
  annotation?: string;
}

const SocialLink = ({ label, href, annotation }: SocialLinkProps) => {
  const [letterStates, setLetterStates] = useState<boolean[]>(
    new Array(label.length).fill(false)
  );
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const checkLetterBackgrounds = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      const newStates = letterRefs.current.map((ref) => {
        if (!ref) return false;

        const rect = ref.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const centerX = rect.left + rect.width / 2;

        const elements = document.elementsFromPoint(centerX, centerY);

        // Check if over footer or any element with inverted background
        const isOverFooter = elements.some((el) => {
          if (el === ref || ref.contains(el) || el.closest('a') === ref.closest('a')) return false;
          return el.tagName.toLowerCase() === 'footer' || el.closest('footer') !== null;
        });

        // In light mode: footer is dark, so invert when over footer
        // In dark mode: footer is light, so invert when over footer
        return isOverFooter;
      });

      setLetterStates(newStates);
    };

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setTimeout(checkLetterBackgrounds, 10);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('scroll', checkLetterBackgrounds, { passive: true });
    window.addEventListener('resize', checkLetterBackgrounds);
    
    // Initial check with slight delay to ensure DOM is ready
    setTimeout(checkLetterBackgrounds, 10);
    checkLetterBackgrounds();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkLetterBackgrounds);
      window.removeEventListener('resize', checkLetterBackgrounds);
    };
  }, [label]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 writing-vertical"
    >
      <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase">
        {label.split('').map((letter, index) => (
          <span
            key={index}
            ref={(el) => { letterRefs.current[index] = el; }}
            className="transition-colors duration-150 hover:text-accent-blue"
            style={{
              color: letterStates[index] 
                ? 'hsl(var(--background))' 
                : 'hsl(var(--foreground))'
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      {annotation && (
        <span className="text-accent-blue text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {annotation}
        </span>
      )}
    </a>
  );
};

export default SocialLink;