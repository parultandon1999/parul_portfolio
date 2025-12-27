import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useContent } from '@/context/ContentContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AdminContent = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { contentData, updateNavigation, updatePageContent, updateFooter } = useContent();

  const [activeTab, setActiveTab] = useState<'navigation' | 'pages' | 'footer'>('navigation');
  const [navForm, setNavForm] = useState(contentData.navigation);
  const [pagesForm, setPagesForm] = useState(contentData.pages);
  const [footerForm, setFooterForm] = useState(contentData.footer);

  if (isLoading) return null;
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header - Preserved as requested */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>manage-content
            </h1>
            <p className="text-lg text-muted-foreground mt-4">Control all text content across your portfolio</p>
          </div>
        </section>

        {/* Tabs - Styled with Material UI (Not Sticky) */}
        <section className="py-4 border-b border-border overflow-x-auto bg-background/50">
          <div className="container mx-auto px-6 lg:px-20">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                minWidth: 'max-content',
                '& .MuiTab-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  '&.Mui-selected': {
                    color: 'hsl(var(--foreground))',
                    backgroundColor: 'hsl(var(--secondary))',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'hsl(var(--foreground))',
                },
              }}
            >
              <Tab label="Navigation" value="navigation" />
              <Tab label="Pages" value="pages" />
              <Tab label="Footer" value="footer" />
            </Tabs>
          </div>
        </section>

        {/* Content - Optimized for Density */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
            
            {/* Navigation Tab */}
            {activeTab === 'navigation' && (
              <div className="border border-border rounded-lg p-4 bg-secondary/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Navigation Links</h3>
                  <Button 
                    variant="contained"
                    onClick={() => updateNavigation(navForm)} 
                    startIcon={<Save size={14} />}
                    sx={{
                      bgcolor: '#22c55e',
                      color: 'white',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      '&:hover': { bgcolor: '#16a34a' }
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(navForm).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-mono text-muted-foreground mb-1 capitalize">{key}</label>
                      <input 
                        type="text" 
                        value={value as string} 
                        onChange={(e) => setNavForm({ ...navForm, [key]: e.target.value })} 
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(pagesForm).map(([page, content]) => (
                  <div key={page} className="border border-border rounded-lg p-4 bg-secondary/30 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{page} Page</h3>
                      <Button 
                        variant="contained"
                        onClick={() => updatePageContent(page as any, content as any)} 
                        startIcon={<Save size={14} />}
                        sx={{
                          bgcolor: '#22c55e',
                          color: 'white',
                          fontFamily: 'monospace',
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          minWidth: 'auto',
                          padding: '6px 12px',
                          '&:hover': { bgcolor: '#16a34a' }
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Heading</label>
                        <input 
                          type="text" 
                          value={(content as any).heading} 
                          onChange={(e) => setPagesForm({ ...pagesForm, [page]: { ...(content as any), heading: e.target.value } })} 
                          className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                        <textarea 
                          value={(content as any).description} 
                          onChange={(e) => setPagesForm({ ...pagesForm, [page]: { ...(content as any), description: e.target.value } })} 
                          rows={4} 
                          className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
              <div className="border border-border rounded-lg p-4 bg-secondary/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Footer Content</h3>
                  <Button 
                    variant="contained"
                    onClick={() => updateFooter(footerForm)} 
                    startIcon={<Save size={14} />}
                    sx={{
                      bgcolor: '#22c55e',
                      color: 'white',
                      fontFamily: 'monospace',
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      '&:hover': { bgcolor: '#16a34a' }
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">Copyright Text</label>
                    <input 
                      type="text" 
                      value={footerForm.copyright} 
                      onChange={(e) => setFooterForm({ ...footerForm, copyright: e.target.value })} 
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">Made With</label>
                    <input 
                      type="text" 
                      value={footerForm.madeWith} 
                      onChange={(e) => setFooterForm({ ...footerForm, madeWith: e.target.value })} 
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" 
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminContent;