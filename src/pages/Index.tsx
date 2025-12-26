import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import HeroSection from '@/components/HeroSection';
import ProjectsPreview from '@/components/ProjectsPreview';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        <HeroSection />
        <ProjectsPreview />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
