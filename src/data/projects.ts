export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  year: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenges: string[];
  results: string[];
  images: string[]; // Array of image URLs or base64
  mainImageIndex: number; // Index of the main image to show on homepage
}

export const projects: Project[] = [
  {
    id: "predictive-analytics-platform",
    title: "Predictive Analytics Platform",
    category: "Machine Learning",
    description: "End-to-end ML pipeline for customer churn prediction achieving 94% accuracy. Built feature engineering pipelines, trained XGBoost and neural network models, and deployed real-time prediction API serving 50K+ daily requests.",
    fullDescription: "This comprehensive machine learning platform was designed to predict customer churn for a SaaS company with over 500,000 active users. The project involved building a complete data pipeline from raw customer interaction logs to production-ready predictions. I implemented advanced feature engineering techniques including RFM analysis, behavioral clustering, and time-series aggregations to capture customer engagement patterns.",
    year: "2025",
    technologies: ["Python", "XGBoost", "TensorFlow", "FastAPI", "PostgreSQL", "Docker"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Handling imbalanced dataset with only 3% churn rate",
      "Processing 50GB+ of raw event data efficiently",
      "Ensuring model predictions under 100ms latency",
      "Integrating with legacy CRM systems"
    ],
    results: [
      "94% prediction accuracy with 0.89 AUC-ROC score",
      "Reduced customer churn by 23% in first quarter",
      "API serving 50K+ daily predictions",
      "$2.1M estimated annual revenue saved"
    ],
    images: [],
    mainImageIndex: 0
  },
  {
    id: "nlp-sentiment-engine",
    title: "NLP Sentiment Engine",
    category: "Natural Language Processing",
    description: "Real-time sentiment analysis system processing 10K+ customer reviews daily. Fine-tuned BERT transformer models for domain-specific sentiment classification with 91% F1 score.",
    fullDescription: "Built a production-grade NLP system that analyzes customer feedback across multiple channels including support tickets, social media, and product reviews. The system uses fine-tuned BERT models specifically trained on domain vocabulary to understand industry-specific terminology and context. Implemented aspect-based sentiment analysis to identify specific product features mentioned in reviews.",
    year: "2024",
    technologies: ["Python", "Transformers", "BERT", "Hugging Face", "AWS Lambda", "S3"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Training models on limited labeled data (5K samples)",
      "Handling multi-language reviews (EN, FR, DE)",
      "Real-time processing requirements",
      "Dealing with sarcasm and context-dependent sentiment"
    ],
    results: [
      "91% F1 score on sentiment classification",
      "Processing 10K+ reviews daily in real-time",
      "Reduced manual review time by 85%",
      "Identified 15 key product improvement areas"
    ],
    images: [],
    mainImageIndex: 0
  },
  {
    id: "computer-vision-qc-system",
    title: "Computer Vision QC System",
    category: "Deep Learning",
    description: "Automated quality control system using object detection for manufacturing defect identification. Reduced manual inspection time by 70% with YOLOv8 model achieving 96% mAP.",
    fullDescription: "Developed an automated visual inspection system for a manufacturing facility producing electronic components. The system uses high-resolution cameras and custom-trained YOLOv8 models to detect defects including scratches, misalignments, and component damage. Implemented a confidence calibration system to minimize false positives while ensuring critical defects are never missed.",
    year: "2024",
    technologies: ["Python", "PyTorch", "YOLOv8", "OpenCV", "Streamlit", "MLflow"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Detecting sub-millimeter defects in high-speed production",
      "Training with limited defect samples (rare events)",
      "Maintaining consistency across varying lighting conditions",
      "Integration with existing production line PLCs"
    ],
    results: [
      "96% mAP on defect detection",
      "70% reduction in manual inspection time",
      "Defect escape rate reduced from 2% to 0.1%",
      "ROI achieved within 6 months"
    ],
    images: [],
    mainImageIndex: 0
  },
  {
    id: "time-series-forecasting",
    title: "Time Series Forecasting",
    category: "Statistical Modeling",
    description: "Demand forecasting system for e-commerce inventory optimization. Implemented ARIMA, Prophet, and LSTM models to predict sales with 15% improvement over baseline methods.",
    fullDescription: "Created an ensemble forecasting system for a large e-commerce retailer to optimize inventory levels across 10,000+ SKUs. The system combines traditional statistical methods (ARIMA, ETS) with modern deep learning approaches (LSTM, Transformer) and uses Prophet for capturing seasonality and holiday effects. Implemented automated model selection based on cross-validation performance.",
    year: "2023",
    technologies: ["Python", "Prophet", "LSTM", "Pandas", "Plotly", "Airflow"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Forecasting for products with sparse sales history",
      "Handling promotional periods and external events",
      "Scaling to 10,000+ SKUs with daily retraining",
      "Providing uncertainty quantification for planning"
    ],
    results: [
      "15% improvement over baseline forecasting",
      "Reduced inventory holding costs by $1.5M annually",
      "Decreased stockouts by 40%",
      "Automated daily forecasts for all SKUs"
    ],
    images: [],
    mainImageIndex: 0
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    category: "Collaborative Filtering",
    description: "Personalized product recommendation engine using matrix factorization and deep learning. Increased user engagement by 25% through hybrid collaborative-content filtering approach.",
    fullDescription: "Built a hybrid recommendation engine for an online marketplace combining collaborative filtering with content-based methods. The system uses matrix factorization (SVD++) for collaborative filtering, BERT embeddings for product descriptions, and a neural network to combine signals. Implemented real-time recommendation updates using streaming architecture.",
    year: "2023",
    technologies: ["Python", "Surprise", "TensorFlow", "Redis", "Spark", "Kafka"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Cold start problem for new users and products",
      "Scaling to 10M+ user-item interactions",
      "Real-time recommendation updates",
      "Balancing exploration vs exploitation"
    ],
    results: [
      "25% increase in user engagement",
      "18% improvement in click-through rate",
      "Real-time recommendations under 50ms",
      "Successfully handling 100K+ concurrent users"
    ],
    images: [],
    mainImageIndex: 0
  },
  {
    id: "data-pipeline-etl",
    title: "Data Pipeline & ETL",
    category: "Data Engineering",
    description: "Scalable data pipeline processing 1TB+ daily data for analytics platform. Built automated ETL workflows with data quality monitoring and alerting systems.",
    fullDescription: "Architected and implemented a modern data platform processing over 1TB of daily data from multiple sources including APIs, databases, and streaming events. Built using Apache Spark for distributed processing, Airflow for orchestration, and dbt for transformations. Implemented comprehensive data quality monitoring with Great Expectations and automated alerting.",
    year: "2023",
    technologies: ["Python", "Apache Spark", "Airflow", "dbt", "Snowflake", "Great Expectations"],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    challenges: [
      "Processing 1TB+ daily with cost efficiency",
      "Ensuring data quality across 200+ tables",
      "Managing schema evolution and backward compatibility",
      "Reducing pipeline failure recovery time"
    ],
    results: [
      "99.5% pipeline reliability",
      "Processing costs reduced by 40%",
      "Data freshness improved from 24h to 2h",
      "Zero data quality incidents in production"
    ],
    images: [],
    mainImageIndex: 0
  },
];
