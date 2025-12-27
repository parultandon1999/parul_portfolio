import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { LogOut, Settings, Users, FileText, Briefcase, Award } from 'lucide-react';
import Button from '@mui/material/Button';

const Admin = () => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-border border-t-foreground rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const adminSections = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Projects',
      description: 'Manage your projects, add new ones, edit descriptions and images',
      href: '/admin/projects',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Skills',
      description: 'Update your skills, proficiency levels, and experience',
      href: '/admin/skills',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'About',
      description: 'Edit your bio, timeline, values, and personal information',
      href: '/admin/about',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Content',
      description: 'Manage all text content across the portfolio',
      href: '/admin/content',
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Settings',
      description: 'Configure site settings, theme, and preferences',
      href: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header - Preserved as requested */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                <span className="text-muted-foreground">#</span>admin
              </h1>
              <Button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                variant="outlined"
                startIcon={<LogOut size={14} />}
                sx={{
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  borderColor: 'rgba(239, 68, 68, 0.3)', // border-red-500/30
                  color: '#dc2626', // text-red-600
                  bgcolor: 'rgba(239, 68, 68, 0.1)', // bg-red-500/10
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: 'rgba(239, 68, 68, 0.5)'
                  }
                }}
              >
                Logout
              </Button>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Welcome to your admin dashboard. Manage all aspects of your portfolio from here.
            </p>
          </div>
        </section>

        {/* Content - Optimized for Density */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
            
            {/* Quick Stats - Compact Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Projects', value: '5' },
                { label: 'Skills', value: '30+' },
                { label: 'Categories', value: '6' },
                { label: 'Certs', value: '4' }
              ].map((stat, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 bg-secondary/20 flex flex-col justify-between h-full">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground font-mono text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
              <span className="text-muted-foreground">#</span>manage
            </h2>
            
            {/* Admin Sections - Dense Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {adminSections.map((section, index) => (
                <a
                  key={index}
                  href={section.href}
                  className="border border-border rounded-lg p-4 hover:border-foreground/50 hover:bg-secondary/30 transition-all group flex flex-col h-full bg-background"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-secondary rounded-md text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                      {section.icon}
                    </div>
                    <span className="text-[10px] font-mono bg-secondary/50 px-2 py-1 rounded text-muted-foreground group-hover:text-foreground transition-colors">
                      {section.href === '/admin/projects' || section.href === '/admin/skills' || section.href === '/admin/about' || section.href === '/admin/content' || section.href === '/admin/settings' ? 'Manage' : 'Soon'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{section.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                    {section.description}
                  </p>
                </a>
              ))}
            </div>

            {/* Info Box - Compact */}
            <div className="border border-border rounded-lg p-4 bg-secondary/20">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Dashboard Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  'Add, edit, and delete projects',
                  'Manage skills & proficiency levels',
                  'Update timeline & personal info',
                  'Edit site text content',
                  'Configure site settings'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;