import { ExternalLink, Github } from 'lucide-react';
import DataScienceBackground from '@/components/DataScienceBackground';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Customer Churn Prediction',
      description: 'Built an ML pipeline to predict customer churn with 94% accuracy using XGBoost and feature engineering.',
      tags: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn'],
      github: '#',
      demo: '#',
    },
    {
      title: 'NLP Sentiment Analyzer',
      description: 'Developed a deep learning model for real-time sentiment analysis of social media data using transformers.',
      tags: ['PyTorch', 'Transformers', 'BERT', 'FastAPI'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Sales Forecasting Dashboard',
      description: 'Created an interactive dashboard with time series forecasting for inventory optimization.',
      tags: ['Prophet', 'Plotly', 'Streamlit', 'SQL'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      {/* Data Science Background */}
      <DataScienceBackground />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="mb-16 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <span className="text-muted-foreground">#</span>projects
            </h2>
            <div className="w-64 h-px bg-border" />
          </div>
          <a href="#" className="hidden md:block text-muted-foreground hover:text-foreground font-mono text-sm transition-colors">
            View all →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-card border border-border rounded-lg overflow-hidden card-shadow hover:border-foreground/30 transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              {/* Project preview */}
              <div className="h-48 bg-secondary relative overflow-hidden">
                {/* Mini chart visualization */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200">
                  {/* Bar chart */}
                  {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
                    <rect
                      key={i}
                      x={x}
                      y={150 - (20 + i * 12)}
                      width="15"
                      height={20 + i * 12}
                      fill="hsl(var(--foreground))"
                      className="animate-bar-rise"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </svg>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border border-muted-foreground/30 rotate-45" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border border-border" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.github} className="p-3 bg-secondary border border-border rounded-full hover:bg-foreground hover:text-background transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.demo} className="p-3 bg-secondary border border-border rounded-full hover:bg-foreground hover:text-background transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-mono font-semibold text-foreground group-hover:underline transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
