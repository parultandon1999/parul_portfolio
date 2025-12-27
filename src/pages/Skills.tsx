import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { useSkills } from '@/context/SkillsContext';
import { useEffect } from 'react';

const Skills = () => {
  // Save scroll position when leaving
  useEffect(() => {
    return () => {
      sessionStorage.setItem('skills-scroll', window.scrollY.toString());
    };
  }, []);

  // Restore scroll position when entering
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('skills-scroll');
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('skills-scroll');
      }, 500);
    }
  }, []);
  const { skillsData } = useSkills();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">

        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>skills
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
              A comprehensive overview of my technical expertise, tools, and proficiencies across data science, machine learning, and software engineering.
            </p>
          </div>
        </section>

        {/* Skills Categories */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="space-y-16">
              {skillsData.categories.map((category) => (
                <div key={category.id} className="space-y-6">
                  {/* Category Header */}
                  <div className="border-l-4 border-foreground pl-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {category.category}
                    </h2>
                    <p className="text-base text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="border border-border rounded-lg p-4 hover:border-foreground/50 transition-colors duration-300"
                      >
                        {/* Skill Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-bold text-foreground mb-1">
                              {skill.name}
                            </h3>
                            <p className="text-xs font-mono text-muted-foreground">
                              {skill.experience}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-foreground">
                              {skill.proficiency}%
                            </div>
                          </div>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="mb-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              <span className="text-muted-foreground">#</span>summary
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-foreground mb-2">{skillsData.summary.totalSkills}+</div>
                <div className="text-muted-foreground font-mono text-xs">
                  Technical Skills
                </div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-foreground mb-2">{skillsData.summary.yearsExperience}</div>
                <div className="text-muted-foreground font-mono text-xs">
                  Years Experience
                </div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-foreground mb-2">{skillsData.summary.totalCategories}</div>
                <div className="text-muted-foreground font-mono text-xs">
                  Skill Categories
                </div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-foreground mb-2">{skillsData.summary.averageProficiency}%</div>
                <div className="text-muted-foreground font-mono text-xs">
                  Average Proficiency
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              <span className="text-muted-foreground">#</span>certifications
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skillsData.certifications.map((cert) => (
                <div key={cert.id} className="border border-border rounded-lg p-4">
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Skills;
