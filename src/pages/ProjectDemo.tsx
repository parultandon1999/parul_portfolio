import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import ProjectImageGallery from '@/components/ProjectImageGallery';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

const ProjectDemo = () => {

  useEffect(() => {
    // Save scroll position before leaving
    return () => {
      sessionStorage.setItem('projectsScrollPosition', window.scrollY.toString());
    };
  }, []);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const projectDemos: Record<string, any> = {
    '1': {
      title: 'Customer Churn Prediction',
      subtitle: 'ML Pipeline for Customer Retention',
      overview: 'A comprehensive machine learning pipeline designed to predict customer churn with 94% accuracy.',
      sections: [
        { title: 'Problem Statement', content: 'Telecom companies lose significant revenue due to customer churn.' },
        { title: 'Data & Features', content: 'Dataset contains 7,043 customer records with 21 features.' },
        { title: 'Model Architecture', content: 'Implemented XGBoost with hyperparameter tuning.' },
        { title: 'Results & Impact', content: 'Model identifies high-risk customers with 89% precision.' },
      ],
      technologies: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn', 'FastAPI', 'Docker'],
      metrics: [
        { label: 'Accuracy', value: '94%' },
        { label: 'Precision', value: '89%' },
        { label: 'Recall', value: '87%' },
        { label: 'F1-Score', value: '0.88' },
      ],
      images: [
        { id: 1, title: 'Data Distribution', description: 'Customer churn distribution analysis', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
        { id: 2, title: 'Model Performance', description: 'Confusion matrix and ROC curve', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop' },
        { id: 3, title: 'Feature Importance', description: 'Top features influencing churn', url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop' },
        { id: 4, title: 'Deployment', description: 'System architecture', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' },
      ],
      links: { github: '#', demo: '#', paper: '#' },
    },
    '2': {
      title: 'NLP Sentiment Analyzer',
      subtitle: 'Real-time Social Media Sentiment Analysis',
      overview: 'A deep learning model for real-time sentiment analysis using transformer-based architectures.',
      sections: [
        { title: 'Problem Statement', content: 'Businesses need to understand customer sentiment from social media.' },
        { title: 'Data & Features', content: 'Trained on 500K+ tweets with 3-class labels.' },
        { title: 'Model Architecture', content: 'Fine-tuned BERT model with custom classification head.' },
        { title: 'Results & Impact', content: 'Processes 10K+ tweets/hour with 92% accuracy.' },
      ],
      technologies: ['PyTorch', 'Transformers', 'BERT', 'FastAPI', 'Redis', 'PostgreSQL'],
      metrics: [
        { label: 'Accuracy', value: '92%' },
        { label: 'Precision', value: '91%' },
        { label: 'Recall', value: '90%' },
        { label: 'Throughput', value: '10K/hr' },
      ],
      images: [
        { id: 1, title: 'Sentiment Distribution', description: 'Distribution of sentiments', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
        { id: 2, title: 'Model Architecture', description: 'BERT-based architecture', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop' },
        { id: 3, title: 'Dashboard', description: 'Real-time monitoring', url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop' },
        { id: 4, title: 'Attention', description: 'Attention visualization', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' },
      ],
      links: { github: '#', demo: '#', paper: '#' },
    },
    '3': {
      title: 'Sales Forecasting Dashboard',
      subtitle: 'Time Series Forecasting & Inventory Optimization',
      overview: 'An interactive dashboard with time series forecasting for inventory optimization.',
      sections: [
        { title: 'Problem Statement', content: 'Retailers struggle with inventory management.' },
        { title: 'Data & Features', content: '3 years of daily sales data with seasonal patterns.' },
        { title: 'Model Architecture', content: 'Used Facebook Prophet for robust forecasting.' },
        { title: 'Results & Impact', content: 'MAPE of 8.5% on test set.' },
      ],
      technologies: ['Prophet', 'Plotly', 'Streamlit', 'SQL', 'AWS', 'Pandas'],
      metrics: [
        { label: 'MAPE', value: '8.5%' },
        { label: 'Cost Reduction', value: '15%' },
        { label: 'Stockout Reduction', value: '22%' },
        { label: 'Forecast Horizon', value: '90 days' },
      ],
      images: [
        { id: 1, title: 'Sales Trends', description: 'Historical sales data', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
        { id: 2, title: 'Forecast Accuracy', description: 'Predicted vs actual sales', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop' },
        { id: 3, title: 'Dashboard', description: 'Interactive interface', url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop' },
        { id: 4, title: 'Optimization', description: 'Inventory levels', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' },
      ],
      links: { github: '#', demo: '#', paper: '#' },
    },
    '4': {
      title: 'Computer Vision Pipeline',
      subtitle: 'Real-time Object Detection & Classification',
      overview: 'An end-to-end computer vision system for object detection and classification.',
      sections: [
        { title: 'Problem Statement', content: 'Real-time object detection is crucial for autonomous systems.' },
        { title: 'Data & Features', content: 'Custom dataset with 50K+ annotated images.' },
        { title: 'Model Architecture', content: 'YOLOv8 architecture with custom backbone.' },
        { title: 'Results & Impact', content: 'mAP of 0.85 on test set.' },
      ],
      technologies: ['TensorFlow', 'OpenCV', 'YOLO', 'Python', 'CUDA', 'TensorRT'],
      metrics: [
        { label: 'mAP', value: '0.85' },
        { label: 'GPU FPS', value: '45' },
        { label: 'Edge FPS', value: '15' },
        { label: 'Model Size', value: '45MB' },
      ],
      images: [
        { id: 1, title: 'Detection Results', description: 'Real-time detection', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
        { id: 2, title: 'Performance', description: 'mAP scores', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop' },
        { id: 3, title: 'Edge Deployment', description: 'Jetson deployment', url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop' },
        { id: 4, title: 'Comparison', description: 'FPS comparison', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' },
      ],
      links: { github: '#', demo: '#', paper: '#' },
    },
    '5': {
      title: 'Recommendation Engine',
      subtitle: 'Collaborative Filtering at Scale',
      overview: 'An engineered collaborative filtering recommendation system serving 1M+ users.',
      sections: [
        { title: 'Problem Statement', content: 'E-commerce platforms need personalized recommendations.' },
        { title: 'Data & Features', content: '100M+ user-item interactions.' },
        { title: 'Model Architecture', content: 'Matrix factorization with ALS.' },
        { title: 'Results & Impact', content: 'Precision@10 of 0.72.' },
      ],
      technologies: ['Spark', 'Scala', 'MLlib', 'Elasticsearch', 'Kafka', 'Airflow'],
      metrics: [
        { label: 'Precision@10', value: '0.72' },
        { label: 'CTR Increase', value: '25%' },
        { label: 'AOV Increase', value: '18%' },
        { label: 'Latency', value: '<100ms' },
      ],
      images: [
        { id: 1, title: 'User-Item Matrix', description: 'Sparse matrix visualization', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
        { id: 2, title: 'Quality', description: 'Precision and recall metrics', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop' },
        { id: 3, title: 'A/B Testing', description: 'Impact on CTR and AOV', url: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop' },
        { id: 4, title: 'Architecture', description: 'System design', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop' },
      ],
      links: { github: '#', demo: '#', paper: '#' },
    },
  };

  const demo = projectDemos[projectId || '1'];

  if (!demo) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header */}
        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
              {demo.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {demo.subtitle}
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Overview</h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
              {demo.overview}
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <ProjectImageGallery images={demo.images} projectTitle={demo.title} />

        {/* Sections */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="space-y-12">
              {demo.sections.map((section: any, index: number) => (
                <div key={index} className="border-l-2 border-border pl-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Key Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {demo.metrics.map((metric: any, index: number) => (
                <div key={index} className="border border-border rounded-lg p-6">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground font-mono text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {demo.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary text-muted-foreground text-sm font-mono rounded-lg border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Resources</h2>
            <div className="flex flex-wrap gap-6">
              <Button
                href={demo.links.github}
                variant="contained"
                sx={{
                  bgcolor: 'hsl(var(--foreground))',
                  color: 'hsl(var(--background))',
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': { 
                    bgcolor: 'hsl(var(--foreground) / 0.9)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }
                }}
              >
                View on GitHub
              </Button>
              <Button
                href={demo.links.demo}
                variant="outlined"
                sx={{
                  borderColor: 'hsl(var(--foreground))',
                  color: 'hsl(var(--foreground))',
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: 'hsl(var(--foreground) / 0.05)',
                    borderColor: 'hsl(var(--foreground))'
                  }
                }}
              >
                Live Demo
              </Button>
              <Button
                href={demo.links.paper}
                variant="outlined"
                sx={{
                  borderColor: 'hsl(var(--foreground))',
                  color: 'hsl(var(--foreground))',
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: 'hsl(var(--foreground) / 0.05)',
                    borderColor: 'hsl(var(--foreground))'
                  }
                }}
              >
                Research Paper
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDemo;