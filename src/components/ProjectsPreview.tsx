import { Link } from 'react-router-dom';
import { useProjects } from '@/context/ProjectsContext';
import { ArrowRight } from 'lucide-react';
import DataScienceBackground from './DataScienceBackground';

const ProjectsPreview = () => {
  const { projects } = useProjects();
  const previewProjects = projects.slice(0, 3);

  if (previewProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-b border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <DataScienceBackground />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            <span className="text-muted-foreground">#</span>featured-projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of recent projects showcasing expertise in data science and machine learning.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewProjects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="group border border-border rounded-lg overflow-hidden hover:border-foreground/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Project Card */}
              <div className="h-full flex flex-col">
                {/* Image */}
                {project.image && (
                  <div className="relative h-48 overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
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
                  <div className="flex items-center gap-2 text-sm font-mono text-foreground group-hover:text-muted-foreground transition-colors">
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
            <a
              href="/projects"
              onClick={() => {
                // Clear saved scroll position so it loads from top
                sessionStorage.removeItem('projects-scroll');
              }}
              className="px-8 py-3 border border-foreground text-foreground rounded-lg font-mono hover:bg-foreground hover:text-background transition-colors cursor-pointer"
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPreview;
