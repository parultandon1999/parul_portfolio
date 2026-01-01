import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  year: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  totalCards: number;
}

const ProjectCard = ({ 
  title, 
  category, 
  description, 
  year, 
  image, 
  technologies = [], 
  liveUrl, 
  githubUrl,
  index,
  totalCards
}: ProjectCardProps) => {
  return (
    <div 
      className="sticky top-24 md:top-32"
      style={{ 
        zIndex: index + 1,
      }}
    >
      <article
        className="group bg-card border-2 border-foreground p-6 md:p-8 lg:p-10 shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          transform: `translateY(${index * 8}px)`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Project Image */}
          <div className="aspect-[16/10] bg-muted overflow-hidden relative border border-foreground/20">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                <span className="font-mono text-5xl font-bold text-muted-foreground/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-accent-blue mb-2 block">
                    {category}
                  </span>
                  <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-black text-hero group-hover:text-accent-blue transition-colors duration-300">
                    {title}
                  </h3>
                </div>
                <span className="font-mono text-sm font-bold text-muted-foreground">{year}</span>
              </div>

              {/* Description */}
              <p className="font-sans text-sm md:text-base text-body leading-relaxed mb-6">
                {description}
              </p>

              {/* Technologies */}
              {technologies.length > 0 && (
                <div className="mb-6">
                  <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3 block">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-3 py-1.5 bg-muted border border-foreground/10 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-6 pt-4 border-t border-foreground/10">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
              <div className="ml-auto">
                <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-accent-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
