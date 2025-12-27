import DataScienceBackground from '@/components/DataScienceBackground';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Programming',
      skills: ['Python', 'R', 'SQL', 'JavaScript', 'Julia'],
    },
    {
      title: 'ML / AI',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Keras'],
    },
    {
      title: 'Data Tools',
      skills: ['Pandas', 'NumPy', 'Spark', 'Hadoop', 'Airflow'],
    },
    {
      title: 'Visualization',
      skills: ['Matplotlib', 'Plotly', 'Tableau', 'Power BI', 'D3.js'],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-24 relative">
      {/* Data Science Background */}
      <DataScienceBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            <span className="text-muted-foreground">#</span>skills
          </h2>
          <div className="w-32 sm:w-48 md:w-96 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6 card-shadow hover:border-foreground/30 transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${categoryIndex * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <h3 className="text-sm sm:text-base md:text-lg font-mono font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground rounded-full" />
                {category.title}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-muted-foreground font-sans text-xs sm:text-sm hover:text-foreground transition-colors"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional skills tags */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-wrap gap-2 justify-center">
          {['Deep Learning', 'NLP', 'Computer Vision', 'Time Series', 'A/B Testing', 'Feature Engineering', 'MLOps', 'Docker', 'AWS', 'GCP'].map((skill) => (
            <span
              key={skill}
              className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-secondary text-muted-foreground text-xs sm:text-sm font-mono rounded-full border border-border hover:border-foreground/30 hover:text-foreground transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
