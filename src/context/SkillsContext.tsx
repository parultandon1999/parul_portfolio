import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  experience: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface SkillsData {
  categories: SkillCategory[];
  certifications: Certification[];
  summary: {
    totalSkills: number;
    yearsExperience: string;
    totalCategories: number;
    averageProficiency: number;
  };
}

interface SkillsContextType {
  skillsData: SkillsData;
  updateSkillsData: (data: SkillsData) => void;
  addCategory: (category: SkillCategory) => void;
  updateCategory: (id: string, category: SkillCategory) => void;
  deleteCategory: (id: string) => void;
  addSkill: (categoryId: string, skill: Skill) => void;
  updateSkill: (categoryId: string, skillId: string, skill: Skill) => void;
  deleteSkill: (categoryId: string, skillId: string) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Certification) => void;
  deleteCertification: (id: string) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_skills';

const defaultSkillsData: SkillsData = {
  categories: [
    {
      id: '1',
      category: 'Programming Languages',
      description: 'Core languages for data science and ML development',
      skills: [
        { id: '1-1', name: 'Python', proficiency: 95, experience: '5+ years', description: 'Primary language for ML, data analysis, and automation' },
        { id: '1-2', name: 'R', proficiency: 85, experience: '3+ years', description: 'Statistical analysis and data visualization' },
        { id: '1-3', name: 'SQL', proficiency: 90, experience: '5+ years', description: 'Database design, optimization, and complex queries' },
        { id: '1-4', name: 'JavaScript', proficiency: 80, experience: '3+ years', description: 'Web development and interactive visualizations' },
        { id: '1-5', name: 'Scala', proficiency: 75, experience: '2+ years', description: 'Big data processing with Apache Spark' },
      ],
    },
    {
      id: '2',
      category: 'Machine Learning & AI',
      description: 'Advanced ML techniques and frameworks',
      skills: [
        { id: '2-1', name: 'TensorFlow', proficiency: 90, experience: '4+ years', description: 'Deep learning framework for production models' },
        { id: '2-2', name: 'PyTorch', proficiency: 88, experience: '3+ years', description: 'Research and experimentation with neural networks' },
        { id: '2-3', name: 'Scikit-learn', proficiency: 92, experience: '5+ years', description: 'Classical ML algorithms and preprocessing' },
        { id: '2-4', name: 'XGBoost', proficiency: 90, experience: '4+ years', description: 'Gradient boosting for tabular data' },
        { id: '2-5', name: 'NLP & Transformers', proficiency: 85, experience: '2+ years', description: 'BERT, GPT, and transformer-based models' },
        { id: '2-6', name: 'Computer Vision', proficiency: 82, experience: '3+ years', description: 'Image classification, detection, and segmentation' },
      ],
    },
    {
      id: '3',
      category: 'Data Engineering',
      description: 'Big data processing and pipeline development',
      skills: [
        { id: '3-1', name: 'Apache Spark', proficiency: 88, experience: '3+ years', description: 'Distributed data processing at scale' },
        { id: '3-2', name: 'Pandas & NumPy', proficiency: 95, experience: '5+ years', description: 'Data manipulation and numerical computing' },
        { id: '3-3', name: 'SQL Databases', proficiency: 90, experience: '5+ years', description: 'PostgreSQL, MySQL, and query optimization' },
        { id: '3-4', name: 'NoSQL', proficiency: 80, experience: '2+ years', description: 'MongoDB, Redis, and document databases' },
        { id: '3-5', name: 'Apache Airflow', proficiency: 85, experience: '2+ years', description: 'Workflow orchestration and scheduling' },
        { id: '3-6', name: 'Kafka', proficiency: 78, experience: '2+ years', description: 'Real-time data streaming' },
      ],
    },
    {
      id: '4',
      category: 'Cloud & DevOps',
      description: 'Cloud platforms and deployment tools',
      skills: [
        { id: '4-1', name: 'AWS', proficiency: 85, experience: '3+ years', description: 'EC2, S3, SageMaker, Lambda, RDS' },
        { id: '4-2', name: 'Google Cloud', proficiency: 80, experience: '2+ years', description: 'BigQuery, Vertex AI, Cloud Storage' },
        { id: '4-3', name: 'Docker', proficiency: 88, experience: '3+ years', description: 'Containerization and microservices' },
        { id: '4-4', name: 'Kubernetes', proficiency: 80, experience: '2+ years', description: 'Orchestration and deployment' },
        { id: '4-5', name: 'CI/CD', proficiency: 85, experience: '3+ years', description: 'GitHub Actions, Jenkins, GitLab CI' },
      ],
    },
    {
      id: '5',
      category: 'Data Visualization',
      description: 'Tools for creating insightful visualizations',
      skills: [
        { id: '5-1', name: 'Matplotlib & Seaborn', proficiency: 90, experience: '5+ years', description: 'Static and statistical visualizations' },
        { id: '5-2', name: 'Plotly', proficiency: 88, experience: '3+ years', description: 'Interactive and web-based visualizations' },
        { id: '5-3', name: 'Tableau', proficiency: 82, experience: '2+ years', description: 'Business intelligence dashboards' },
        { id: '5-4', name: 'Power BI', proficiency: 80, experience: '2+ years', description: 'Microsoft analytics platform' },
        { id: '5-5', name: 'D3.js', proficiency: 75, experience: '2+ years', description: 'Custom web visualizations' },
      ],
    },
    {
      id: '6',
      category: 'Specialized Skills',
      description: 'Domain-specific expertise',
      skills: [
        { id: '6-1', name: 'Time Series Analysis', proficiency: 88, experience: '3+ years', description: 'Forecasting, ARIMA, Prophet' },
        { id: '6-2', name: 'Feature Engineering', proficiency: 92, experience: '5+ years', description: 'Domain knowledge and feature creation' },
        { id: '6-3', name: 'A/B Testing', proficiency: 85, experience: '3+ years', description: 'Experimental design and statistical testing' },
        { id: '6-4', name: 'MLOps', proficiency: 82, experience: '2+ years', description: 'Model deployment, monitoring, and versioning' },
        { id: '6-5', name: 'API Development', proficiency: 85, experience: '3+ years', description: 'FastAPI, Flask, REST APIs' },
      ],
    },
  ],
  certifications: [
    { id: '1', title: 'AWS Certified Machine Learning Specialist', issuer: 'Amazon Web Services', year: '2023' },
    { id: '2', title: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', year: '2023' },
    { id: '3', title: 'Deep Learning Specialization', issuer: 'Coursera (Andrew Ng)', year: '2022' },
    { id: '4', title: 'Kubernetes Application Developer', issuer: 'Linux Foundation', year: '2022' },
  ],
  summary: {
    totalSkills: 30,
    yearsExperience: '5+',
    totalCategories: 6,
    averageProficiency: 88,
  },
};

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skillsData, setSkillsData] = useState<SkillsData>(defaultSkillsData);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSkillsData(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load skills from storage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever skills change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skillsData));
  }, [skillsData]);

  const updateSkillsData = (data: SkillsData) => {
    setSkillsData(data);
  };

  const addCategory = (category: SkillCategory) => {
    setSkillsData({
      ...skillsData,
      categories: [...skillsData.categories, category],
    });
  };

  const updateCategory = (id: string, category: SkillCategory) => {
    setSkillsData({
      ...skillsData,
      categories: skillsData.categories.map(c => (c.id === id ? category : c)),
    });
  };

  const deleteCategory = (id: string) => {
    setSkillsData({
      ...skillsData,
      categories: skillsData.categories.filter(c => c.id !== id),
    });
  };

  const addSkill = (categoryId: string, skill: Skill) => {
    setSkillsData({
      ...skillsData,
      categories: skillsData.categories.map(c =>
        c.id === categoryId ? { ...c, skills: [...c.skills, skill] } : c
      ),
    });
  };

  const updateSkill = (categoryId: string, skillId: string, skill: Skill) => {
    setSkillsData({
      ...skillsData,
      categories: skillsData.categories.map(c =>
        c.id === categoryId
          ? { ...c, skills: c.skills.map(s => (s.id === skillId ? skill : s)) }
          : c
      ),
    });
  };

  const deleteSkill = (categoryId: string, skillId: string) => {
    setSkillsData({
      ...skillsData,
      categories: skillsData.categories.map(c =>
        c.id === categoryId ? { ...c, skills: c.skills.filter(s => s.id !== skillId) } : c
      ),
    });
  };

  const addCertification = (cert: Certification) => {
    setSkillsData({
      ...skillsData,
      certifications: [...skillsData.certifications, cert],
    });
  };

  const updateCertification = (id: string, cert: Certification) => {
    setSkillsData({
      ...skillsData,
      certifications: skillsData.certifications.map(c => (c.id === id ? cert : c)),
    });
  };

  const deleteCertification = (id: string) => {
    setSkillsData({
      ...skillsData,
      certifications: skillsData.certifications.filter(c => c.id !== id),
    });
  };

  return (
    <SkillsContext.Provider
      value={{
        skillsData,
        updateSkillsData,
        addCategory,
        updateCategory,
        deleteCategory,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertification,
        updateCertification,
        deleteCertification,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within SkillsProvider');
  }
  return context;
};
