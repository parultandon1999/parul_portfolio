import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>settings
            </h1>
            <p className="text-lg text-muted-foreground mt-4">Settings page coming soon</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
