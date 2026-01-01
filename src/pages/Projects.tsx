import TopNav from "@/components/TopNav";
import SocialLinksContainer from "@/components/SocialLinksContainer";
import Footer from "@/components/Footer";
import { ArrowUpRight, Github, ExternalLink, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
const Projects = () => {
  const projects = useProjects();
  return (
    <main className="min-h-screen bg-background relative">
      <TopNav />

      <div className="w-full pl-6 pr-16 md:px-16 lg:px-24 xl:px-32 py-20 md:py-32">
        {/* Header */}
        <div className="mb-12 md:mb-24 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
            Portfolio
          </span>
          <h1 className="font-sans text-4xl md:text-6xl lg:text-8xl font-black text-hero leading-none tracking-tight mb-4 md:mb-6">
            Projects
            <span className="text-accent-blue">.</span>
          </h1>
          <p className="font-sans text-base md:text-lg lg:text-xl text-body max-w-2xl">
            A collection of data science and machine learning projects. Each project showcases end-to-end problem solving from data exploration to model deployment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-16 mb-12 md:mb-24 py-6 md:py-8 border-y border-border opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div>
            <span className="font-sans text-2xl md:text-4xl font-black text-hero">50+</span>
            <p className="font-sans text-xs md:text-sm text-muted-foreground mt-1">ML Models Deployed</p>
          </div>
          <div>
            <span className="font-sans text-2xl md:text-4xl font-black text-hero">10B+</span>
            <p className="font-sans text-xs md:text-sm text-muted-foreground mt-1">Data Points Processed</p>
          </div>
          <div>
            <span className="font-sans text-2xl md:text-4xl font-black text-hero">5+</span>
            <p className="font-sans text-xs md:text-sm text-muted-foreground mt-1">Years Experience</p>
          </div>
          <div>
            <span className="font-sans text-2xl md:text-4xl font-black text-hero">15+</span>
            <p className="font-sans text-xs md:text-sm text-muted-foreground mt-1">Kaggle Medals</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group bg-card border-2 border-foreground p-3 md:p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Image Area */}
              <div className="aspect-[16/9] md:aspect-[16/10] bg-muted overflow-hidden mb-3 md:mb-6 relative border border-foreground/20">
                {project.images && project.images.length > 0 && project.images[project.mainImageIndex ?? 0] ? (
                  <img 
                    src={project.images[project.mainImageIndex ?? 0]} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <span className="font-mono text-3xl md:text-5xl font-bold text-muted-foreground/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2 md:space-y-4">
                {/* Category & Year */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-accent-blue">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs md:text-sm font-bold text-muted-foreground">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg md:text-2xl font-black text-hero leading-tight group-hover:text-accent-blue transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs md:text-sm text-body line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 bg-muted border border-foreground/10 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="font-mono text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 bg-muted border border-foreground/10 text-muted-foreground">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-foreground/10">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                  >
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Details
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                    >
                      <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Code
                    </a>
                  )}
                  <div className="ml-auto">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-foreground group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <SocialLinksContainer />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Projects;
