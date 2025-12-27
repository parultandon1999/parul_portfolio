import { ArrowRight, Download } from 'lucide-react';
import DataScienceBackground from '@/components/DataScienceBackground';
import { toast } from '@/components/ui/sonner';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const HeroSection = () => {

  const handleDownloadCV = async () => {
    try {
      const response = await fetch('/resume.pdf');
      
      if (!response.ok) {
        toast.error('CV not available');
        return;
      }

      const blob = await response.blob();
      
      // Check if file is empty (0 bytes)
      if (blob.size === 0) {
        toast.error('CV not available');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('CV downloaded successfully!');
    } catch (error) {
      toast.error('CV not available');
    }
  };
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16 sm:pt-0">
      {/* Data Science Background Visualizations */}
      <DataScienceBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-8">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-secondary rounded-full text-xs sm:text-sm font-mono text-foreground border border-border">
                Open for opportunities
              </span>
            </div>

            <h1 className="animate-fade-in-up opacity-100" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Hi, I'm a{' '}
                <span className="underline decoration-2 underline-offset-4">Data Scientist</span>
                <br />
                and{' '}
                <span className="text-muted-foreground">ML Engineer</span>
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-muted-foreground max-w-lg font-sans animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              I transform complex data into actionable insights and build 
              intelligent systems that drive business decisions.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {/* Buttons Container */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 2, sm: 3 }} 
                alignItems="stretch"
                className="animate-fade-in-up opacity-0" 
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                {/* Primary Button: Contact Me */}
                <Button 
                  variant="contained" 
                  href="/contact"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    backgroundColor: 'hsl(var(--foreground))', // Uses your Tailwind var
                    color: 'hsl(var(--background))',           // Uses your Tailwind var
                    fontFamily: 'monospace',                   // Matches your font-mono
                    textTransform: 'none',                     // Removes the default ALL CAPS
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                    padding: '10px 24px',
                    borderRadius: '8px',                       // Matches rounded-lg
                    boxShadow: 'none',
                    border: '1px solid hsl(var(--foreground))',
                    '&:hover': {
                      backgroundColor: 'hsl(var(--foreground) / 0.9)', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Contact Me
                </Button>

                {/* Secondary Button: Download CV */}
                <Button 
                  variant="outlined" 
                  onClick={handleDownloadCV}
                  startIcon={<Download size={18} />}
                  sx={{
                    borderColor: 'hsl(var(--border))',         // Uses your Tailwind var
                    color: 'hsl(var(--foreground))',           // Uses your Tailwind var
                    fontFamily: 'monospace',
                    textTransform: 'none',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    fontWeight: 500,
                    padding: '10px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      borderColor: 'hsl(var(--foreground))',
                      backgroundColor: 'hsl(var(--secondary))', 
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Download CV
                </Button>
              </Stack>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 pt-2 sm:pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <div>
                <div className="text-xl sm:text-3xl font-mono font-bold text-foreground">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-mono font-bold text-foreground">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Projects Done</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-mono font-bold text-foreground">20+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">ML Models</div>
              </div>
            </div>
          </div>

          {/* Profile visual - Now visible on all screens */}
          <div className="relative mt-8 sm:mt-0">
            <div className="relative">
              {/* Geometric frame - Hidden on mobile, shown on larger screens */}
              <div className="absolute -top-8 -left-8 w-48 sm:w-64 h-48 sm:h-64 border border-border hidden sm:block" />
              <div className="absolute -top-4 -left-4 w-48 sm:w-64 h-48 sm:h-64 border border-muted-foreground/30 hidden sm:block" />
              
              {/* Your profile image behind the chart */}
              <div className="absolute -top-8 -left-8 w-48 sm:w-64 h-48 sm:h-64 hidden sm:block overflow-hidden rounded-lg">
                <img 
                  src="/pic.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover opacity-70 pointer-events-none select-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              
              {/* Profile placeholder with data visualization aesthetic */}
              <div className="w-full sm:w-80 h-64 sm:h-96 bg-card rounded-lg overflow-hidden relative card-shadow border border-border mx-auto">
                {/* Mini chart visualization inside profile */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 320 384">
                  {/* Bar chart */}
                  {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
                    <rect
                      key={i}
                      x={x}
                      y={300 - (30 + i * 15)}
                      width="20"
                      height={30 + i * 15}
                      fill="hsl(var(--foreground))"
                      className="animate-bar-rise"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="2"
                    points="40,280 80,220 120,250 160,180 200,200 240,140 280,160"
                  />
                </svg>

                {/* Abstract data visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 text-center p-6 sm:p-8">
                    {/* Circle - bigger on mobile, shows image on mobile and code on desktop */}
                    <div className="w-32 sm:w-24 h-32 sm:h-24 mx-auto rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden select-none">
                      {/* Image on mobile, code on desktop */}
                      <img 
                        src="/pic.png" 
                        alt="Profile" 
                        className="w-full h-full object-cover sm:hidden pointer-events-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-foreground hidden sm:block">&lt;/&gt;</span>
                    </div>
                    <div className="space-y-2 hidden sm:block">
                      <div className="h-2 bg-muted-foreground/30 rounded w-24 sm:w-32 mx-auto" />
                      <div className="h-2 bg-muted-foreground/20 rounded w-20 sm:w-24 mx-auto" />
                      <div className="h-2 bg-muted-foreground/10 rounded w-22 sm:w-28 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements - Hidden on mobile */}
              <div className="absolute -right-12 top-1/4 w-20 h-20 opacity-30 hidden sm:block">
                <svg viewBox="0 0 80 80">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle
                      key={i}
                      cx={10 + i * 15}
                      cy={40 + Math.sin(i) * 20}
                      r="4"
                      fill="hsl(var(--foreground))"
                    />
                  ))}
                </svg>
              </div>
              <div className="absolute -right-8 bottom-1/4 w-4 h-4 bg-foreground rounded-full hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
