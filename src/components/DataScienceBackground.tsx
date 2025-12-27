import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { useTheme } from '@/hooks/useTheme';

// --- Types & Interfaces ---

interface DotConfig {
  id: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  mass: number;     // Heavier dots move slower
  friction: number; // How quickly they slow down
}

interface Velocity {
  vx: number;
  vy: number;
}

// --- Constants & Palettes ---

// A curated "Dark Mode Starry" palette: Bright pastels and whites that pop against dark backgrounds.
const FEMININE_PALETTE = [
  '#FFB7B2', // Soft Rose
  '#FF69B4', // Hot Pink
  '#E6E6FA', // Lavender
  '#F0F8FF', // Alice Blue (Bright Star)
  '#FFFACD', // Lemon Chiffon (Golden Star)
  '#FFFFFF', // Pure White
  '#FF1493', // Deep Pink
  '#E0B0FF', // Mauve
];

// --- Helper Functions ---

const randomColor = (palette: string[]) => palette[Math.floor(Math.random() * palette.length)];
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Individual Dot Component ---

const InteractiveDot = ({ 
  config, 
  mouseRef, 
  isScattering,
  speed,
  glowIntensity,
}: { 
  config: DotConfig; 
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  isScattering: boolean;
  speed: number;
  glowIntensity: number;
}) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: config.initialX, y: config.initialY });
  const velocityRef = useRef<Velocity>({ 
    vx: randomRange(-0.3, 0.3) * speed, // Apply speed multiplier
    vy: randomRange(-0.3, 0.3) * speed 
  });
  
  // State for visual "hover" effects
  const [isHovered, setIsHovered] = useState(false);
  // State for "Excitement" (when in obsession range)
  const [isExcited, setIsExcited] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let time = Math.random() * 100; // Random offset for organic floating

    const update = () => {
      if (!dotRef.current) return;

      const pos = positionRef.current;
      const vel = velocityRef.current;
      const mouse = mouseRef.current;

      // 1. Calculate Distance to Mouse
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 2. Define Interaction Zones
      const shyRadius = 90;        // Slightly smaller shy zone for tiny dots
      const obsessionRadius = 300; // "I want to be near you" zone

      // 3. Physics & Personality Logic
      if (isScattering) {
        // SCATTER MODE: Flee gracefully
        vel.vx *= 1.05;
        vel.vy *= 1.05;
        vel.vx += randomRange(-0.5, 0.5);
        vel.vy += randomRange(-0.5, 0.5);
        setIsExcited(false);
      } else if (distance < shyRadius) {
        // SHY MODE: Gentle Panic
        const force = (shyRadius - distance) / shyRadius;
        const angle = Math.atan2(dy, dx);
        
        const pushX = -Math.cos(angle) * force * 2.5; 
        const pushY = -Math.sin(angle) * force * 2.5;

        vel.vx += pushX / config.mass;
        vel.vy += pushY / config.mass;
        
        // Cute little jitter
        vel.vx += (Math.random() - 0.5) * 0.5;
        vel.vy += (Math.random() - 0.5) * 0.5;
        setIsExcited(true);

      } else if (distance < obsessionRadius) {
        // OBSESSED MODE: Float closer like a bubble
        const angle = Math.atan2(dy, dx);
        const attractionForce = 0.08; // Gentle pull

        vel.vx += (Math.cos(angle) * attractionForce) / config.mass;
        vel.vy += (Math.sin(angle) * attractionForce) / config.mass;
        
        // Heartbeat pulse movement
        time += 0.1;
        vel.vx += Math.sin(time) * 0.02;
        vel.vy += Math.cos(time) * 0.02;
        
        setIsExcited(true);
      } else {
        // LONELY/FLOAT MODE: Wandering all over
        time += 0.01;
        setIsExcited(false);
        // Gentle flow
        vel.vx += Math.sin(time) * 0.015 / config.mass;
        vel.vy += Math.cos(time) * 0.015 / config.mass;
      }

      // 4. Apply Velocity
      pos.x += vel.vx;
      pos.y += vel.vy;

      // 5. Friction (Air resistance)
      // High friction = 0.98 (Very floaty, keeps them moving longer)
      vel.vx *= 0.98;
      vel.vy *= 0.98;

      // 6. Boundary Checking (Bounce softly)
      const margin = config.size * 2;
      if (pos.x < -margin || pos.x > window.innerWidth + margin) {
        vel.vx *= -1;
        if (pos.x < -margin) pos.x = -margin;
        if (pos.x > window.innerWidth + margin) pos.x = window.innerWidth + margin;
      }
      if (pos.y < -margin || pos.y > window.innerHeight + margin) {
        vel.vy *= -1;
         if (pos.y < -margin) pos.y = -margin;
        if (pos.y > window.innerHeight + margin) pos.y = window.innerHeight + margin;
      }

      // 7. Render
      // Smoother scaling logic
      const targetScale = isHovered ? 3 : (isExcited ? 1.5 : 1);
      
      dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${targetScale})`;
      
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [config, isScattering, isHovered, speed, glowIntensity]);

  return (
    <div
      ref={dotRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed rounded-full pointer-events-auto cursor-pointer"
      style={{
        width: `${config.size}px`,
        height: `${config.size}px`,
        // Turn Hot Pink when excited
        backgroundColor: isExcited || isHovered ? '#FF69B4' : config.color,
        // Dark Mode Star Glow: Brighter, sharper glow against dark background
        boxShadow: isExcited || isHovered
          ? `0 0 ${10 * glowIntensity}px #FF69B4, 0 0 ${20 * glowIntensity}px #FFC0CB, 0 0 ${40 * glowIntensity}px white` 
          : `0 0 ${4 * glowIntensity}px ${config.color}, 0 0 ${8 * glowIntensity}px ${config.color}`,
        opacity: isScattering ? 0 : (isExcited ? 1 : 0.9), // Higher opacity for visibility on dark
        // Only transition non-transform properties for smoothness
        transition: 'opacity 0.5s ease-out, background-color 0.4s ease, box-shadow 0.4s ease',
        zIndex: isHovered ? 50 : 10,
        willChange: 'transform',
      }}
    />
  );
};

// --- Main Background Component ---

const DataScienceBackground = () => {
  const { settingsData } = useSettings();
  const { theme } = useTheme();
  const [linePoints, setLinePoints] = useState<string>('');
  const [dots, setDots] = useState<DotConfig[]>([]);
  const [isScattering, setIsScattering] = useState(false);
  
  const mouseRef = useRef({ x: -1000, y: -1000 }); 
  
  const location = useLocation();
  const isHomePage = location?.pathname === '/';

  // Don't render if disabled
  if (!settingsData?.theme?.dotsAnimation?.enabled) {
    return null;
  }

  const dotsConfig = settingsData.theme.dotsAnimation;
  const isLight = theme === 'light';
  const dotStyles = isLight ? dotsConfig.dotsLight : dotsConfig.dotsDark;

  // 1. Initialize Line Chart Background
  useEffect(() => {
    const points = Array.from({ length: 8 }, (_, i) => { 
      const x = i * 50;
      const y = 50 + Math.sin(i * 0.5) * 30 + Math.random() * 10;
      return `${x},${y}`;
    }).join(' ');
    setLinePoints(points);
  }, []);

  // 2. Initialize Dots
  useEffect(() => {
    // SCATTERED FLOW LOGIC
    // Using dot count from settings
    const DOT_COUNT = dotsConfig.dotCount;
    
    const initialDots: DotConfig[] = Array.from({ length: DOT_COUNT }, (_, i) => {
      const dotStyle = dotStyles[i % dotStyles.length];
      return {
        id: i,
        size: randomRange(dotsConfig.minSize, dotsConfig.maxSize), 
        color: dotStyle.color,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        mass: randomRange(1.5, 3), 
        friction: 0.98, 
      };
    });
    setDots(initialDots);

    // MOUSE LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // TOUCH LISTENER
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Prevent default can stop scrolling if you want dots to take priority, 
        // but for a background, it's usually better to let the user scroll.
        // We just track the touch position.
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove); // Immediate reaction on tap

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, [dotsConfig.dotCount, dotsConfig.minSize, dotsConfig.maxSize, dotStyles]);

  // 3. Handle Route Scattering
  useEffect(() => {
    if (!isHomePage && location) {
      setIsScattering(true);
      const timer = setTimeout(() => setIsScattering(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsScattering(false);
    }
  }, [location, isHomePage]);

  return (
    // TRANSPARENT BACKGROUND: No bg-color class, so it overlays on your existing page
    <div className="fixed inset-0 overflow-hidden pointer-events-none">

      {/* SVG Background Decoration */}
      <svg
        className="absolute top-20 right-10 w-96 h-48 opacity-30 pointer-events-none"
        viewBox="0 0 350 120"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6E6FA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={linePoints}
          className="animate-pulse"
        />
        {linePoints.split(' ').map((point, i) => {
          const [x, y] = point.split(',').map(Number);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#FFB6C1"
              className="opacity-30"
            />
          );
        })}
      </svg>

      {/* Interactive Dots */}
      <div className="absolute inset-0 w-full h-full">
        {dots.map((dot) => (
          <InteractiveDot 
            key={dot.id} 
            config={dot} 
            mouseRef={mouseRef}
            isScattering={isScattering}
            speed={dotsConfig.speed}
            glowIntensity={dotsConfig.glowIntensity}
          />
        ))}
      </div>
    </div>
  );
};

export default DataScienceBackground;