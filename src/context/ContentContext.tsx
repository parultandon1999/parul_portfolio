import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ContentData {
  navigation: {
    home: string;
    projects: string;
    skills: string;
    about: string;
    contact: string;
    logo: string;
  };
  pages: {
    projects: {
      heading: string;
      description: string;
    };
    skills: {
      heading: string;
      description: string;
    };
    about: {
      heading: string;
      description: string;
    };
    contact: {
      heading: string;
      description: string;
    };
  };
  footer: {
    copyright: string;
    madeWith: string;
  };
}

interface ContentContextType {
  contentData: ContentData;
  updateContentData: (data: ContentData) => void;
  updateNavigation: (nav: ContentData['navigation']) => void;
  updatePageContent: (page: keyof ContentData['pages'], content: ContentData['pages'][keyof ContentData['pages']]) => void;
  updateFooter: (footer: ContentData['footer']) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_content';

const defaultContentData: ContentData = {
  navigation: {
    home: '#home',
    projects: '#projects',
    skills: '#skills',
    about: '#about',
    contact: '#contact',
    logo: '<DataScientist/>',
  },
  pages: {
    projects: {
      heading: '#projects',
      description: 'A collection of data science and machine learning projects showcasing real-world problem solving and advanced technical implementations.',
    },
    skills: {
      heading: '#skills',
      description: 'A comprehensive overview of my technical expertise, tools, and proficiencies across data science, machine learning, and software engineering.',
    },
    about: {
      heading: '#about',
      description: 'A passionate data scientist and ML engineer dedicated to transforming data into actionable insights and building intelligent systems.',
    },
    contact: {
      heading: '#contact',
      description: 'Get in touch with me for collaborations, opportunities, or just to chat about data science and machine learning.',
    },
  },
  footer: {
    copyright: '© 2024 Data Scientist. All rights reserved.',
    madeWith: 'Made with passion and code',
  },
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contentData, setContentData] = useState<ContentData>(defaultContentData);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setContentData(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load content from storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contentData));
  }, [contentData]);

  const updateContentData = (data: ContentData) => setContentData(data);
  const updateNavigation = (nav: ContentData['navigation']) => setContentData({ ...contentData, navigation: nav });
  const updatePageContent = (page: keyof ContentData['pages'], content: ContentData['pages'][keyof ContentData['pages']]) => setContentData({ ...contentData, pages: { ...contentData.pages, [page]: content } });
  const updateFooter = (footer: ContentData['footer']) => setContentData({ ...contentData, footer });

  return (
    <ContentContext.Provider value={{ contentData, updateContentData, updateNavigation, updatePageContent, updateFooter }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
