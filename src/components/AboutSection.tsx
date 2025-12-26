import DataScienceBackground from '@/components/DataScienceBackground';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Data Science Background */}
      <DataScienceBackground />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            <span className="text-muted-foreground">#</span>about-me
          </h2>
          <div className="w-48 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Hello! I'm a passionate data scientist with a strong foundation in 
              mathematics, statistics, and computer science. I specialize in 
              transforming raw data into meaningful insights and building 
              predictive models that solve real-world problems.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              My journey in data science began with a curiosity for understanding 
              patterns in complex datasets. Today, I work at the intersection of 
              machine learning, deep learning, and business intelligence.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              When I'm not training models or analyzing data, you can find me 
              contributing to open-source projects, writing technical blogs, or 
              exploring the latest advancements in AI.
            </p>

            <div className="pt-4">
              <h3 className="text-lg font-mono font-semibold text-foreground mb-4">
                Current Focus:
              </h3>
              <ul className="space-y-2">
                {[
                  'Large Language Models & RAG Systems',
                  'MLOps & Production ML Pipelines',
                  'Causal Inference & Experimentation',
                  'Real-time ML at Scale',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground font-sans">
                    <span className="w-2 h-2 bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="relative bg-card border border-border rounded-lg p-8 card-shadow">
              <div className="space-y-6">
                {/* Code snippet aesthetic */}
                <div className="font-mono text-sm">
                  <div className="text-muted-foreground">
                    <span className="text-foreground">class</span>{' '}
                    <span className="font-semibold">DataScientist</span>:
                  </div>
                  <div className="pl-4 mt-2 space-y-1">
                    <div>
                      <span className="text-foreground">def</span>{' '}
                      <span className="font-semibold">__init__</span>
                      <span className="text-muted-foreground">(self):</span>
                    </div>
                    <div className="pl-4 text-muted-foreground">
                      self.name = <span className="text-foreground">"Your Name"</span>
                    </div>
                    <div className="pl-4 text-muted-foreground">
                      self.role = <span className="text-foreground">"Data Scientist"</span>
                    </div>
                    <div className="pl-4 text-muted-foreground">
                      self.experience = <span className="text-foreground">5</span>
                    </div>
                  </div>
                  <div className="pl-4 mt-4 space-y-1">
                    <div>
                      <span className="text-foreground">def</span>{' '}
                      <span className="font-semibold">get_skills</span>
                      <span className="text-muted-foreground">(self):</span>
                    </div>
                    <div className="pl-4 text-muted-foreground">
                      <span className="text-foreground">return</span> [
                    </div>
                    <div className="pl-8 text-foreground">
                      "Python", "ML", "Deep Learning"
                    </div>
                    <div className="pl-4 text-muted-foreground">]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
