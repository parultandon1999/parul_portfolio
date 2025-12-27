import { useProjects } from '@/context/ProjectsContext';
import { ArrowRight } from 'lucide-react';
import DataScienceBackground from './DataScienceBackground';
import Button from '@mui/material/Button';

const ProjectsPreview = () => {
  const { projects } = useProjects();
  const previewProjects = projects.slice(0, 3);

  if (previewProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-b border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-100">
        <DataScienceBackground />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
            <span className="text-muted-foreground">#</span>featured-projects
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
            A selection of recent projects showcasing expertise in data science and machine learning.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {previewProjects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="group border border-border rounded-lg overflow-hidden hover:border-foreground/50 transition-all duration-300 hover:shadow-lg bg-background"
            >
              {/* Project Card */}
              <div className="h-full flex flex-col">
                {/* Image */}
                {project.image && (
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono text-muted-foreground border border-border/50 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View More */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-foreground group-hover:text-muted-foreground transition-colors">
                    <span>View Project</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        {projects.length > 3 && (
          <div className="flex justify-center">
          <Button 
            variant="contained" 
            href="/projects"
            onClick={() => {
              sessionStorage.removeItem('projects-scroll');
            }}
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
            View All Projects
          </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPreview;
