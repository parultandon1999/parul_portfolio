import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

import { useAbout } from '@/context/AboutContext';
import { Heart } from 'lucide-react';

const About = () => {
  const { aboutData } = useAbout(); [
    {
      year: '2019',
      title: 'Started Data Science Journey',
      description: 'Began learning Python and machine learning fundamentals. First projects in data analysis and visualization.',
      icon: '🚀',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion for Data',
      description: 'I believe data tells stories. My mission is to uncover insights that drive meaningful business decisions.',
    },
  ];

  const interests = [
    'Machine Learning',
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header */}
        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>{aboutData.intro.heading.replace('#', '')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
              {aboutData.intro.description}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Who I Am</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {aboutData.whoIAm}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {aboutData.whoIAmPart2}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {aboutData.whoIAmPart3}
                </p>
              </div>
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{aboutData.stats.experience}</div>
                    <div className="text-sm text-muted-foreground">Years of Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{aboutData.stats.projects}</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{aboutData.stats.skills}</div>
                    <div className="text-sm text-muted-foreground">Technical Skills</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{aboutData.stats.certifications}</div>
                    <div className="text-sm text-muted-foreground">Professional Certifications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              <span className="text-muted-foreground">#</span>core-values
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {aboutData.values.map((value) => (
                <div key={value.id} className="border border-border rounded-lg p-4 hover:border-foreground/50 transition-colors">
                  <div className="text-2xl mb-3">{value.icon}</div>
                  <h3 className="text-base font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-8 text-foreground">
              <span className="text-muted-foreground">#</span>journey
            </h2>
            <div className="space-y-6">
              {aboutData.timeline.map((event) => (
                <div key={event.id} className="border-l-2 border-border pl-6 py-3 hover:border-foreground/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{event.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{event.year}</span>
                        <h3 className="text-base font-bold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-mono rounded-lg border border-border hover:border-foreground/30 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Beyond Work */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <span className="text-muted-foreground">#</span>beyond-work
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-3xl">
              {aboutData.beyondWork.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">{aboutData.ctaHeading}</h2>
            <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
              {aboutData.ctaDescription}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="px-6 py-2 bg-foreground text-background rounded-lg font-mono text-sm hover:bg-foreground/90 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="/projects"
                className="px-6 py-2 border border-foreground text-foreground rounded-lg font-mono text-sm hover:bg-foreground/10 transition-colors"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
