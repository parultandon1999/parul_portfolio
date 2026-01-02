export interface HeroContent {
  greeting: string;
  name: string;
  bio: string;
  footnote1: string;
  footnote2: string;
  profileImage: string;
  visible: boolean;
  order: number;
}

export interface ActionButtonContent {
  label: string;
  annotation?: string;
  visible: boolean;
  link?: string;
  order: number;
}

export interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  imageUrl?: string;
  visible: boolean;
  order: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  visible: boolean;
  order: number;
}

export interface SocialLink {
  label: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface FooterContent {
  ctaTitle: string;
  ctaDescription: string;
  email: string;
  copyright: string;
  tagline: string;
  visible: boolean;
  socialLinks: {
    linkedin: string;
    dribbble: string;
    github: string;
    twitter: string;
  };
}

export interface SectionVisibility {
  hero: boolean;
  actionButtons: boolean;
  sidebarSocial: boolean;
  featuredProjects: boolean;
  skills: boolean;
  footer: boolean;
}

export interface SiteSettings {
  theme: "light" | "dark" | "auto";
  sectionVisibility: SectionVisibility;
}

export interface SiteContent {
  hero: HeroContent;
  actionButtons: {
    resume: ActionButtonContent;
    chat: ActionButtonContent;
  };
  sidebarSocialLinks: SocialLink[];
  featuredProjects: FeaturedProject[];
  skillCategories: SkillCategory[];
  footer: FooterContent;
  settings: SiteSettings;
}

const STORAGE_KEY = "site_content";

const defaultContent: SiteContent = {
  hero: {
    greeting: "Hello data enthusiast,",
    name: "I'm Parul",
    bio: "Hi! I'm a Data Scientist based in Chandigarh. Every day I explore data, build models, and create insights that drive decisions. Turning raw data into actionable intelligence is my passion. Numbers tell stories, don't you think?",
    footnote1: "A passionate data scientist skilled in ML, AI, and statistical analysis, open to opportunities.",
    footnote2: "Check out my Kaggle profile and GitHub for more projects.",
    profileImage: "",
    visible: true,
    order: 1,
  },
  actionButtons: {
    resume: {
      label: "resume",
      annotation: "",
      visible: true,
      link: "",
      order: 1,
    },
    chat: {
      label: "chat",
      visible: true,
      link: "/contact",
      order: 2,
    },
  },
  sidebarSocialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com", visible: true, order: 1 },
    { label: "Dribbble", href: "https://dribbble.com", visible: true, order: 2 },
    { label: "Twitter", href: "https://twitter.com", visible: true, order: 3 },
  ],
  featuredProjects: [
    {
      title: "Predictive Analytics Platform",
      category: "Machine Learning",
      description: "End-to-end ML pipeline for customer churn prediction with 94% accuracy using XGBoost and deep learning.",
      githubUrl: "https://github.com/example/predictive-analytics",
      imageUrl: "",
      visible: true,
      order: 1,
    },
    {
      title: "NLP Sentiment Engine",
      category: "Natural Language Processing",
      description: "Real-time sentiment analysis system processing 10K+ reviews daily using transformer models.",
      githubUrl: "https://github.com/example/nlp-sentiment",
      imageUrl: "",
      visible: true,
      order: 2,
    },
    {
      title: "Computer Vision Dashboard",
      category: "Deep Learning",
      description: "Object detection and image classification system for manufacturing quality control.",
      githubUrl: "https://github.com/example/cv-dashboard",
      imageUrl: "",
      visible: true,
      order: 3,
    },
  ],
  skillCategories: [
    {
      title: "Machine Learning",
      skills: ["Scikit-learn", "XGBoost", "TensorFlow", "PyTorch", "Keras"],
      visible: true,
      order: 1,
    },
    {
      title: "Data Analysis",
      skills: ["Python", "Pandas", "NumPy", "SQL", "R"],
      visible: true,
      order: 2,
    },
    {
      title: "Visualization",
      skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI"],
      visible: true,
      order: 3,
    },
    {
      title: "Big Data & MLOps",
      skills: ["Spark", "Airflow", "Docker", "AWS", "MLflow"],
      visible: true,
      order: 4,
    },
  ],
  footer: {
    ctaTitle: "Let's work together",
    ctaDescription: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    email: "hello@example.com",
    copyright: "Kaan. All rights reserved.",
    tagline: "Designed & Built with passion",
    visible: true,
    socialLinks: {
      linkedin: "https://linkedin.com",
      dribbble: "https://dribbble.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  settings: {
    theme: "auto",
    sectionVisibility: {
      hero: true,
      actionButtons: true,
      sidebarSocial: true,
      featuredProjects: true,
      skills: true,
      footer: true,
    },
  },
};

export const getSiteContent = (): SiteContent => {
  if (typeof window === "undefined") return defaultContent;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Deep merge with defaults to handle new fields
      return {
        ...defaultContent,
        ...parsed,
        hero: { ...defaultContent.hero, ...parsed.hero },
        actionButtons: { 
          ...defaultContent.actionButtons, 
          ...parsed.actionButtons,
          resume: { ...defaultContent.actionButtons.resume, ...parsed.actionButtons?.resume },
          chat: { ...defaultContent.actionButtons.chat, ...parsed.actionButtons?.chat },
        },
        sidebarSocialLinks: parsed.sidebarSocialLinks || defaultContent.sidebarSocialLinks,
        featuredProjects: parsed.featuredProjects || defaultContent.featuredProjects,
        skillCategories: parsed.skillCategories || defaultContent.skillCategories,
        footer: { ...defaultContent.footer, ...parsed.footer },
        settings: { ...defaultContent.settings, ...parsed.settings },
      };
    } catch {
      return defaultContent;
    }
  }
  return defaultContent;
};

export const saveSiteContent = (content: SiteContent): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const resetSiteContent = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export { defaultContent };
