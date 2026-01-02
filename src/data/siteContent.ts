export interface HeroContent {
  greeting: string;
  name: string;
  bio: string;
  footnote1: string;
  footnote2: string;
  profileImage: string;
}

export interface ActionButtonContent {
  label: string;
  annotation?: string;
  visible: boolean;
  link?: string;
}

export interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  imageUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  visible: boolean;
}

export interface FooterContent {
  ctaTitle: string;
  ctaDescription: string;
  email: string;
  copyright: string;
  tagline: string;
  socialLinks: {
    linkedin: string;
    dribbble: string;
    github: string;
    twitter: string;
  };
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
  },
  actionButtons: {
    resume: {
      label: "resume",
      annotation: "",
      visible: true,
      link: "",
    },
    chat: {
      label: "chat",
      visible: true,
      link: "/contact",
    },
  },
  sidebarSocialLinks: [
    { label: "LinkedIn", href: "https://linkedin.com", visible: true },
    { label: "Dribbble", href: "https://dribbble.com", visible: true },
    { label: "Twitter", href: "https://twitter.com", visible: true },
  ],
  featuredProjects: [
    {
      title: "Predictive Analytics Platform",
      category: "Machine Learning",
      description: "End-to-end ML pipeline for customer churn prediction with 94% accuracy using XGBoost and deep learning.",
      githubUrl: "https://github.com/example/predictive-analytics",
      imageUrl: "",
    },
    {
      title: "NLP Sentiment Engine",
      category: "Natural Language Processing",
      description: "Real-time sentiment analysis system processing 10K+ reviews daily using transformer models.",
      githubUrl: "https://github.com/example/nlp-sentiment",
      imageUrl: "",
    },
    {
      title: "Computer Vision Dashboard",
      category: "Deep Learning",
      description: "Object detection and image classification system for manufacturing quality control.",
      githubUrl: "https://github.com/example/cv-dashboard",
      imageUrl: "",
    },
  ],
  skillCategories: [
    {
      title: "Machine Learning",
      skills: ["Scikit-learn", "XGBoost", "TensorFlow", "PyTorch", "Keras"],
    },
    {
      title: "Data Analysis",
      skills: ["Python", "Pandas", "NumPy", "SQL", "R"],
    },
    {
      title: "Visualization",
      skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI"],
    },
    {
      title: "Big Data & MLOps",
      skills: ["Spark", "Airflow", "Docker", "AWS", "MLflow"],
    },
  ],
  footer: {
    ctaTitle: "Let's work together",
    ctaDescription: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    email: "hello@example.com",
    copyright: "Kaan. All rights reserved.",
    tagline: "Designed & Built with passion",
    socialLinks: {
      linkedin: "https://linkedin.com",
      dribbble: "https://dribbble.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
};

export const getSiteContent = (): SiteContent => {
  if (typeof window === "undefined") return defaultContent;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields
      return {
        ...defaultContent,
        ...parsed,
        hero: { ...defaultContent.hero, ...parsed.hero },
        actionButtons: { ...defaultContent.actionButtons, ...parsed.actionButtons },
        sidebarSocialLinks: parsed.sidebarSocialLinks || defaultContent.sidebarSocialLinks,
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
