import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProjectImage {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image?: string;
  images?: ProjectImage[];
  hoverPreview?: {
    title: string;
    description: string;
    image: string;
  };
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
  getProject: (id: number) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_projects';

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Customer Churn Prediction',
    description: 'Built a comprehensive ML pipeline to predict customer churn with 94% accuracy using XGBoost and advanced feature engineering.',
    tags: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn', 'FastAPI', 'Docker'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    images: [],
  },
  {
    id: 2,
    title: 'NLP Sentiment Analyzer',
    description: 'Developed a deep learning model for real-time sentiment analysis of social media data using transformer-based architectures.',
    tags: ['PyTorch', 'Transformers', 'BERT', 'FastAPI', 'Redis', 'PostgreSQL'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    images: [],
  },
  {
    id: 3,
    title: 'Sales Forecasting Dashboard',
    description: 'Created an interactive dashboard with time series forecasting for inventory optimization.',
    tags: ['Prophet', 'Plotly', 'Streamlit', 'SQL', 'AWS', 'Pandas'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=600&fit=crop',
    images: [],
  },
  {
    id: 4,
    title: 'Computer Vision Pipeline',
    description: 'Built an end-to-end computer vision system for object detection and classification.',
    tags: ['TensorFlow', 'OpenCV', 'YOLO', 'Python', 'CUDA', 'TensorRT'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    images: [],
  },
  {
    id: 5,
    title: 'Recommendation Engine',
    description: 'Engineered a collaborative filtering recommendation system serving 1M+ users.',
    tags: ['Spark', 'Scala', 'MLlib', 'Elasticsearch', 'Kafka', 'Airflow'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    images: [],
  },
];

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load projects from storage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Math.max(...projects.map(p => p.id), 0) + 1,
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: number, project: Omit<Project, 'id'>) => {
    setProjects(projects.map(p => (p.id === id ? { ...project, id } : p)));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getProject = (id: number) => {
    return projects.find(p => p.id === id);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};
