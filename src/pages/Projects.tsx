import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { useProjects } from '@/context/ProjectsContext';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectPreviewHover from '@/components/ProjectPreviewHover';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image?: string;
  hoverPreview?: {
    title: string;
    description: string;
    image: string;
  };
}

const Projects = () => {
  const { projects } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header Section */}
        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
              A collection of data science and machine learning projects showcasing real-world problem solving and advanced technical implementations.
            </p>
          </div>
        </section>

        {/* Stacked Cards Section */}
        <div className="w-full py-20">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="border-l-2 border-border pl-8 py-4 hover:border-foreground/50 transition-colors duration-300 group cursor-pointer"
              >
                {/* Project Number and Title */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-muted-foreground transition-colors"
                    >
                      {project.title}
                    </Link>
                  </div>
                  <div className="h-px w-12 bg-foreground/20" />
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border/50 rounded-md hover:border-foreground/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-6">
                  <ProjectPreviewHover
                    projectId={project.id}
                    projectTitle={project.title}
                    imageUrl={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'}
                    description={project.description}
                    hoverPreview={project.hoverPreview}
                  >
                    <button className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-mono text-sm">
                      <ExternalLink size={16} />
                      View Demo
                    </button>
                  </ProjectPreviewHover>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-mono text-sm"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
