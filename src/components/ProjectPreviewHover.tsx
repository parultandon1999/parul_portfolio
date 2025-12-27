import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectPreviewHoverProps {
  projectId: number;
  projectTitle: string;
  imageUrl: string;
  description: string;
  hoverPreview?: {
    title: string;
    description: string;
    image: string;
  };
  children: React.ReactNode;
}

const ProjectPreviewHover = ({
  projectId,
  projectTitle,
  imageUrl,
  description,
  hoverPreview,
  children,
}: ProjectPreviewHoverProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState<'bottom' | 'top' | 'left' | 'right'>('bottom');
  const triggerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
  window.location.href = `/projects/${projectId}`;
};

  // Calculate best position for preview
  useEffect(() => {
    if (!isHovering || !triggerRef.current || !previewRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const previewRect = previewRef.current.getBoundingClientRect();
    
    const PREVIEW_WIDTH = 320; // w-80 = 320px
    const PREVIEW_HEIGHT = 380; // approximate height
    const MARGIN = 16; // mt-4 = 16px
    const VIEWPORT_PADDING = 16; // padding from viewport edges

    let newPosition: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

    // Check if there's enough space below
    const spaceBelow = window.innerHeight - (triggerRect.bottom + MARGIN);
    const spaceAbove = triggerRect.top - MARGIN;
    const spaceRight = window.innerWidth - (triggerRect.right + MARGIN);
    const spaceLeft = triggerRect.left - MARGIN;

    // Prioritize vertical positioning first
    if (spaceBelow >= PREVIEW_HEIGHT + VIEWPORT_PADDING) {
      newPosition = 'bottom';
    } else if (spaceAbove >= PREVIEW_HEIGHT + VIEWPORT_PADDING) {
      newPosition = 'top';
    } else if (spaceRight >= PREVIEW_WIDTH + VIEWPORT_PADDING) {
      newPosition = 'right';
    } else if (spaceLeft >= PREVIEW_WIDTH + VIEWPORT_PADDING) {
      newPosition = 'left';
    } else {
      // Fallback: use the direction with most space
      const spaces = { bottom: spaceBelow, top: spaceAbove, right: spaceRight, left: spaceLeft };
      newPosition = Object.keys(spaces).reduce((a, b) => 
        spaces[b as keyof typeof spaces] > spaces[a as keyof typeof spaces] ? (b as any) : a
      ) as any;
    }

    setPosition(newPosition);
  }, [isHovering]);

  // Use hover preview data if available, otherwise use defaults
  const displayTitle = hoverPreview?.title || projectTitle;
  const displayDescription = hoverPreview?.description || description;
  const displayImage = hoverPreview?.image || imageUrl;

  // Position classes based on calculated position
  const positionClasses = {
    bottom: 'left-0 top-full mt-4',
    top: 'left-0 bottom-full mb-4',
    right: 'left-full ml-4 top-1/2 -translate-y-1/2',
    left: 'right-full mr-4 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button onClick={handleClick} className="cursor-pointer">
        {children}
      </button>

      <AnimatePresence>
        {isHovering && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-80 bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-50 pointer-events-none ${positionClasses[position]}`}
          >
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden bg-secondary">
              <img
                src={displayImage}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {displayTitle}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {displayDescription}
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  Hover to preview • Click to view full demo
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPreviewHover;
