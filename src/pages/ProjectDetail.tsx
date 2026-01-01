import TopNav from "@/components/TopNav";
import SocialLinksContainer from "@/components/SocialLinksContainer";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Github, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="min-h-screen bg-background relative">
        <TopNav />
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-24 md:py-32 text-center">
          <h1 className="font-sans text-4xl md:text-5xl font-black text-hero mb-6">Project Not Found</h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative">
      <TopNav />

      <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32 py-20 md:py-32">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 md:mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-12 md:mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-accent-blue">
              {project.category}
            </span>
            <span className="font-mono text-sm font-bold text-muted-foreground">
              {project.year}
            </span>
          </div>
          <h1 className="font-sans text-3xl md:text-5xl lg:text-7xl font-black text-hero leading-tight mb-6">
            {project.title}
            <span className="text-accent-blue">.</span>
          </h1>
          
          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-4 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-accent-blue transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground px-4 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && project.images.some(url => url) ? (
          <div className="space-y-4 mb-10 md:mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Main Image */}
            <div className="aspect-[16/9] md:aspect-[21/9] bg-muted overflow-hidden border-2 border-foreground">
              <img 
                src={project.images[project.mainImageIndex ?? 0] || project.images.find(url => url) || ''} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Additional Images Grid */}
            {project.images.filter(url => url).length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {project.images.filter(url => url).slice(1).map((url, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted overflow-hidden border border-foreground/50">
                    <img 
                      src={url} 
                      alt={`${project.title} ${i + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-[16/9] md:aspect-[21/9] bg-muted overflow-hidden mb-10 md:mb-16 border-2 border-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
              <span className="font-mono text-5xl md:text-8xl font-bold text-muted-foreground/20">
                {project.title.split(' ').map(w => w[0]).join('')}
              </span>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 md:space-y-12">
            {/* Overview */}
            <section className="opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
              <h2 className="font-sans text-xl md:text-2xl font-black text-hero mb-4 md:mb-6">
                Overview
              </h2>
              <p className="font-sans text-base md:text-lg text-body leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            {/* Challenges */}
            <section className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-sans text-xl md:text-2xl font-black text-hero mb-4 md:mb-6">
                Challenges
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent-blue mt-0.5 shrink-0" />
                    <span className="font-sans text-sm md:text-base text-body">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Results */}
            <section className="opacity-0 animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <h2 className="font-sans text-xl md:text-2xl font-black text-hero mb-4 md:mb-6">
                Results
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-sans text-sm md:text-base text-body">{result}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {/* Tech Stack */}
            <div className="bg-card border-2 border-foreground p-4 md:p-6">
              <h3 className="font-sans text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 bg-muted border border-foreground/10 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card border-2 border-foreground p-4 md:p-6">
              <h3 className="font-sans text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
                Project Info
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">Category</span>
                  <span className="font-sans text-sm font-semibold text-foreground">{project.category}</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">Year</span>
                  <span className="font-sans text-sm font-semibold text-foreground">{project.year}</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">Technologies</span>
                  <span className="font-sans text-sm font-semibold text-foreground">{project.technologies.length} tools used</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-border opacity-0 animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Projects
          </Link>
        </div>
      </div>

      <SocialLinksContainer />
      <Footer />
    </main>
  );
};

export default ProjectDetail;
