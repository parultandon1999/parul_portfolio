import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  index: number;
}

const FeaturedProjectCard = ({
  title, category, description, imageUrl, githubUrl, index
}: FeaturedProjectCardProps) => {
  
  return (
    <div
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      {/* Card Container */}
      <div className="bg-card border-2 border-foreground p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        {/* Image Area */}
        <div className="aspect-[16/10] bg-muted overflow-hidden mb-4 md:mb-6 relative border border-foreground/20">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
              <span className="font-mono text-3xl md:text-4xl font-bold text-muted-foreground/30">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Category */}
          <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-accent-blue">
            {category}
          </span>
          
          {/* Title */}
          <h3 className="font-sans text-xl md:text-2xl font-black text-hero leading-tight group-hover:text-accent-blue transition-colors duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="font-sans text-sm text-body line-clamp-2">
            {description}
          </p>
          
          {/* Action Links */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>
            
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent-blue transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
