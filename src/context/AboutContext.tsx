import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  intro: {
    heading: string;
    description: string;
  };
  whoIAm: string;
  whoIAmPart2: string;
  whoIAmPart3: string;
  stats: {
    experience: string;
    projects: string;
    skills: string;
    certifications: string;
  };
  values: CoreValue[];
  timeline: TimelineEvent[];
  interests: string[];
  beyondWork: string[];
  ctaHeading: string;
  ctaDescription: string;
}

interface AboutContextType {
  aboutData: AboutData;
  updateAboutData: (data: AboutData) => void;
  updateIntro: (intro: AboutData['intro']) => void;
  updateWhoIAm: (text: string, part: 1 | 2 | 3) => void;
  updateStats: (stats: AboutData['stats']) => void;
  addValue: (value: CoreValue) => void;
  updateValue: (id: string, value: CoreValue) => void;
  deleteValue: (id: string) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, event: TimelineEvent) => void;
  deleteTimelineEvent: (id: string) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  addBeyondWork: (text: string) => void;
  updateBeyondWork: (index: number, text: string) => void;
  removeBeyondWork: (index: number) => void;
  updateCTA: (heading: string, description: string) => void;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_about';

const defaultAboutData: AboutData = {
  intro: {
    heading: '#about',
    description: 'A passionate data scientist and ML engineer dedicated to transforming data into actionable insights and building intelligent systems.',
  },
  whoIAm: "I'm a data scientist and machine learning engineer with 5+ years of experience transforming complex data into actionable insights. My journey started with a curiosity about patterns in data, and it has evolved into a passion for building intelligent systems that solve real-world problems.",
  whoIAmPart2: "I specialize in end-to-end machine learning solutions, from data preprocessing and feature engineering to model deployment and monitoring. I'm equally comfortable working with classical ML algorithms, deep learning architectures, and big data technologies.",
  whoIAmPart3: "Beyond technical skills, I believe in the importance of clear communication, collaborative problem-solving, and continuous learning in a rapidly evolving field.",
  stats: {
    experience: '5+',
    projects: '50+',
    skills: '30+',
    certifications: '4',
  },
  values: [
    { id: '1', icon: '❤️', title: 'Passion for Data', description: 'I believe data tells stories. My mission is to uncover insights that drive meaningful business decisions.' },
    { id: '2', icon: '💼', title: 'Practical Solutions', description: 'I focus on building real-world solutions that solve actual problems, not just theoretical exercises.' },
    { id: '3', icon: '📖', title: 'Continuous Learning', description: 'The field evolves rapidly. I stay updated with latest techniques, tools, and best practices.' },
    { id: '4', icon: '🏆', title: 'Excellence', description: 'I strive for high-quality code, thorough testing, and production-ready solutions in everything I do.' },
  ],
  timeline: [
    { id: '1', year: '2019', title: 'Started Data Science Journey', description: 'Began learning Python and machine learning fundamentals. First projects in data analysis and visualization.', icon: '🚀' },
    { id: '2', year: '2020', title: 'First ML Model in Production', description: 'Deployed customer churn prediction model that reduced churn by 15% for a telecom company.', icon: '📊' },
    { id: '3', year: '2021', title: 'Deep Learning Specialization', description: "Completed Andrew Ng's Deep Learning course. Started working with neural networks and NLP.", icon: '🧠' },
    { id: '4', year: '2022', title: 'Cloud & MLOps Expertise', description: 'Earned AWS ML Specialist and GCP Data Engineer certifications. Mastered containerization and deployment.', icon: '☁️' },
    { id: '5', year: '2023', title: 'Senior Data Scientist', description: 'Leading ML initiatives, mentoring junior engineers, and architecting scalable ML systems.', icon: '👨‍💼' },
    { id: '6', year: '2024', title: 'Full-Stack ML Engineer', description: 'Combining data science expertise with full-stack development for end-to-end ML solutions.', icon: '🎯' },
  ],
  interests: ['Machine Learning', 'Data Science', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Big Data', 'Cloud Computing', 'Open Source', 'Technical Writing', 'Mentoring', 'Data Visualization', 'MLOps'],
  beyondWork: [
    'When I\'m not working on data science projects, you can find me exploring the latest advancements in AI and machine learning through research papers and online courses. I\'m an avid reader of technical blogs and enjoy staying updated with industry trends.',
    'I\'m passionate about open-source contributions and believe in giving back to the community. I regularly contribute to ML libraries and share my knowledge through technical writing and mentoring junior engineers.',
    'Outside of tech, I enjoy hiking, photography, and traveling. I find that stepping away from screens and exploring nature often leads to creative breakthroughs in problem-solving.',
  ],
  ctaHeading: "Let's Work Together",
  ctaDescription: "I'm always interested in discussing new projects, opportunities, and ideas. Feel free to reach out if you'd like to collaborate or just chat about data science and machine learning.",
};

export const AboutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAboutData(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load about data from storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(aboutData));
  }, [aboutData]);

  const updateAboutData = (data: AboutData) => setAboutData(data);
  const updateIntro = (intro: AboutData['intro']) => setAboutData({ ...aboutData, intro });
  const updateWhoIAm = (text: string, part: 1 | 2 | 3) => {
    const key = part === 1 ? 'whoIAm' : part === 2 ? 'whoIAmPart2' : 'whoIAmPart3';
    setAboutData({ ...aboutData, [key]: text });
  };
  const updateStats = (stats: AboutData['stats']) => setAboutData({ ...aboutData, stats });
  const addValue = (value: CoreValue) => setAboutData({ ...aboutData, values: [...aboutData.values, value] });
  const updateValue = (id: string, value: CoreValue) => setAboutData({ ...aboutData, values: aboutData.values.map(v => (v.id === id ? value : v)) });
  const deleteValue = (id: string) => setAboutData({ ...aboutData, values: aboutData.values.filter(v => v.id !== id) });
  const addTimelineEvent = (event: TimelineEvent) => setAboutData({ ...aboutData, timeline: [...aboutData.timeline, event] });
  const updateTimelineEvent = (id: string, event: TimelineEvent) => setAboutData({ ...aboutData, timeline: aboutData.timeline.map(e => (e.id === id ? event : e)) });
  const deleteTimelineEvent = (id: string) => setAboutData({ ...aboutData, timeline: aboutData.timeline.filter(e => e.id !== id) });
  const addInterest = (interest: string) => setAboutData({ ...aboutData, interests: [...aboutData.interests, interest] });
  const removeInterest = (interest: string) => setAboutData({ ...aboutData, interests: aboutData.interests.filter(i => i !== interest) });
  const addBeyondWork = (text: string) => setAboutData({ ...aboutData, beyondWork: [...aboutData.beyondWork, text] });
  const updateBeyondWork = (index: number, text: string) => setAboutData({ ...aboutData, beyondWork: aboutData.beyondWork.map((b, i) => (i === index ? text : b)) });
  const removeBeyondWork = (index: number) => setAboutData({ ...aboutData, beyondWork: aboutData.beyondWork.filter((_, i) => i !== index) });
  const updateCTA = (heading: string, description: string) => setAboutData({ ...aboutData, ctaHeading: heading, ctaDescription: description });

  return (
    <AboutContext.Provider value={{ aboutData, updateAboutData, updateIntro, updateWhoIAm, updateStats, addValue, updateValue, deleteValue, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent, addInterest, removeInterest, addBeyondWork, updateBeyondWork, removeBeyondWork, updateCTA }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAbout must be used within AboutProvider');
  }
  return context;
};
