import TopNav from "@/components/TopNav";
import SocialLinksContainer from "@/components/SocialLinksContainer";
import ActionButton from "@/components/ActionButton";
import Footnote from "@/components/Footnote";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import SkillCard from "@/components/SkillCard";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { FileText, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const Index = () => {
  const navigate = useNavigate();
  const { content } = useSiteContent();

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <TopNav />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 lg:py-40">
          <div className="space-y-6 md:space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic">
              {content.hero.greeting}
            </h2>
            <h1 className="font-sans text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-hero leading-none tracking-tight">
              {content.hero.name}
              <span className="text-accent-blue text-4xl md:text-6xl lg:text-7xl align-super ml-1">*</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mt-12 md:mt-16 lg:mt-24">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed text-body max-w-xl">
                {content.hero.bio}
              </p>
            </div>

            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {content.actionButtons.resume.visible && (
                <ActionButton
                  icon={<FileText className="w-8 h-8" strokeWidth={1.5} />}
                  label={content.actionButtons.resume.label}
                  annotation={content.actionButtons.resume.annotation}
                  onClick={content.actionButtons.resume.link ? () => window.open(content.actionButtons.resume.link, '_blank') : undefined}
                />
              )}
              {content.actionButtons.chat.visible && (
                <ActionButton
                  icon={<MessageCircle className="w-8 h-8" strokeWidth={1.5} />}
                  label={content.actionButtons.chat.label}
                  onClick={() => navigate(content.actionButtons.chat.link || "/contact")}
                />
              )}
            </div>
          </div>

          {/* Footnotes with Profile Image */}
          <div className="mt-32 md:mt-40 lg:mt-52 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="space-y-3 max-w-2xl">
              <Footnote marker="*" text={content.hero.footnote1} />
              <Footnote marker="**" text={content.hero.footnote2} />
            </div>
            
            {/* Profile Image Circle */}
            {content.hero.profileImage && (
              <div className="mt-8 md:mt-12">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-foreground/30">
                  <img 
                    src={content.hero.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-background">
        <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                Selected Work
              </span>
              <h2 className="font-sans text-4xl md:text-5xl lg:text-7xl font-black text-hero leading-none">
                Featured Projects<span className="text-accent-blue">.</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider hover:bg-accent-blue transition-colors duration-300"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {content.featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                description={project.description}
                githubUrl={project.githubUrl}
                imageUrl={project.imageUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-muted/30">
        <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32">
          <div className="mb-16 md:mb-20">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              Tech Stack
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-7xl font-black text-hero leading-none">
              Skills & Expertise<span className="text-accent-blue">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 lg:gap-24">
            {content.skillCategories.map((category, index) => (
              <SkillCard key={category.title} title={category.title} skills={category.skills} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-background">
        <div className="w-full max-w-3xl mx-auto pl-6 pr-16 md:px-16 lg:px-24 xl:px-32">
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Contact
          </span>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-black text-hero leading-none mb-12">
            Send a message<span className="text-accent-blue">.</span>
          </h2>
          <ContactForm />
        </div>
      </section>

      <SocialLinksContainer />
      <Footer />
    </main>
  );
};

export default Index;
